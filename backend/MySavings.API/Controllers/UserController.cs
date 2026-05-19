
using Microsoft.AspNetCore.Mvc;
using MySavings.Services;
using MySavings.Services.Models;

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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var user = await userService.GetAsync(id);
            if (user == null)
            {
                return NoContent();
            }
            return Ok(user);
        }
        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateUser createUser)
        {
            var userId = await userService.AddAsync(createUser);
            return Created("/",userId);
        }
    }
}