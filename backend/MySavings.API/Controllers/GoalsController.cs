using Microsoft.AspNetCore.Mvc;
using MySavings.Services;

namespace MySavings.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoalsController : ControllerBase
    {
        private readonly IGoalService _goalService;

        public GoalsController(IGoalService goalService)
        {
            _goalService = goalService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGoals([FromQuery] int userId)
        {
            var goals = await _goalService.GetUserGoalsAsync(userId);
            return Ok(goals);
        }
    }
}