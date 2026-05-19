
using Microsoft.AspNetCore.Mvc;
using MySavings.Services;
using MySavings.API.Models.Requests;

namespace MySavings.API.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("create-user")]
        public async Task<IActionResult> CreateAsync([FromBody]
            CreateUserRequest createUser)
        {
            try
            {
                var userId = await userService.AddAsync(createUser.UserName,
                    createUser.Email, createUser.Password);
                return Created("/", userId);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Endpointas skirtas testavimui
        [HttpGet("get-user/{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var user = await userService.GetAsync(id);
            if (user == null)
            {
                return NoContent();
            }
            return Ok(user);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody]
            ChangePasswordRequest changePassword)
        {
            var result = await userService.ChangePasswordAsync(changePassword.UserId,
                changePassword.CurrentPassword, changePassword.NewPassword);
            return Ok(result);
        }

        [HttpPost("change-email")]
        public async Task<IActionResult> ChangeEmailAsync([FromBody]
            ChangeEmailRequest changeEmail)
        {
            var result = await userService.ChangeEmailAsync(changeEmail.UserId,
                changeEmail.Email);
            return Ok(result);
        }

        [HttpDelete("delete-user/{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await userService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

    }
}