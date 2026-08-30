using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using MySavings.API.Models.Requests;
using MySavings.Services;
using Shop.API;

namespace MySavings.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TokenService tokenService;
        private readonly IUserService userService;

        private readonly ILogger<AuthController> _logger;

        public AuthController(TokenService tokenService,
             IUserService userService,
             ILogger<AuthController> logger)
        {
            this.tokenService = tokenService;
            this.userService = userService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest loginRequest)
        {
            var user = await userService.LoginAsync(loginRequest.Email, loginRequest.Password);
            if (user != null)
            {
                _logger.LogInformation(
                    "User login successful. UserId: {UserId}, Email: {Email}",
                    user.Id,
                    user.Email
                );
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("Role", user.Role ?? "user"),
                };

                string accessToken = tokenService.GenerateAccessToken(claims);
                string refreshToken = tokenService.GenerateRefreshToken();

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(7),
                };

                Response.Cookies.Append("RefreshToken", refreshToken, cookieOptions);

                return Ok(new { accessToken });
            }

            _logger.LogWarning(
                   "Failed login attempt. Email: {Email}",
                   loginRequest.Email
               );

            return Unauthorized();
        }
    }
}
