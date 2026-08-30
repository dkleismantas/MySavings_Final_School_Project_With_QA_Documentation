
using Microsoft.AspNetCore.Mvc;
using MySavings.Services;
using MySavings.API.Models.Requests;
using Microsoft.AspNetCore.Authorization;

namespace MySavings.API.Controllers
{
    [ApiController]
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
            var userId = await userService.AddAsync(createUser.UserName,
                createUser.Email, createUser.Password);
            return Created($"/api/user/get-user/{userId}", userId);
        }

    }
}