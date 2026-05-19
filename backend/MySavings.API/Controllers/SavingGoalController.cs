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

      
        [HttpGet("get-by-id/{savingGoalId}")]
        public async Task<IActionResult> GetByIdAsync(int savingGoalId)
        {
            var savingGoal = await savingGoalService.GetByIdAsync(savingGoalId);
            if (savingGoal == null)
            {
                return NotFound();
            }
            return Ok(savingGoal);
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

        [HttpPut("update-saving-goal")]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateSavingGoalRequest updateSavingGoal)
        {
            try
            {
                var savingGoal = await savingGoalService.GetByIdAsync(updateSavingGoal.Id);
                if (savingGoal == null)
                {
                    return NotFound();
                }

                savingGoal.Name = updateSavingGoal.Name;
                savingGoal.TargetAmount = updateSavingGoal.TargetAmount;
                savingGoal.CurrentAmount = updateSavingGoal.CurrentAmount;

                await savingGoalService.UpdateAsync(savingGoal);
                return Ok(savingGoal);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-saving-goal/{savingGoalId}")]
        public async Task<IActionResult> DeleteAsync(int savingGoalId)
        {
            try
            {
                var result = await savingGoalService.DeleteAsync(savingGoalId);
                if (!result)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}