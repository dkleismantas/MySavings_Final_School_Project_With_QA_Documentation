using Microsoft.AspNetCore.Mvc;
using MySavings.Services;
using MySavings.API.Models.SavingGoal;

namespace MySavings.API.Controllers
{
    [Route("api/[controller]")]
    public class SavingGoalController : ControllerBase
    {
        private readonly ISavingGoalService savingGoalService;

        public SavingGoalController(ISavingGoalService savingGoalService)
        {
            this.savingGoalService = savingGoalService;
        }

        [HttpPost("add-saving-goal")]
        public async Task<IActionResult> AddAsync([FromBody]
            CreateSavingGoalRequest createSavingGoal)
        {
            try
            {
                var savingGoalId = await savingGoalService.AddAsync(new MySavings.Entities.SavingGoal
                {
                    Name = createSavingGoal.Name,
                    TargetAmount = createSavingGoal.TargetAmount,
                    CurrentAmount = createSavingGoal.CurrentAmount,
                    UserId = createSavingGoal.UserId
                });
                return Created("/", savingGoalId);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-saving-goals/{userId}")]
        public async Task<IActionResult> GetByUserIdAsync(int userId)
        {
            var savingGoals = await savingGoalService.GetByUserIdAsync(userId);
            if (savingGoals == null || !savingGoals.Any())
            {
                return NoContent();
            }
            return Ok(savingGoals);
        }
    }

}