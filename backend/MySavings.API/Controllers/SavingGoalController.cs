using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySavings.API.Models.SavingGoal;
using MySavings.Entities;
using MySavings.Services;

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
        [Authorize(Policy = "userOnly")]
        public async Task<IActionResult> AddAsync(
            [FromBody] CreateSavingGoalRequest createSavingGoal
        )
        {
            try
            {
                var userIdClaim = User.FindFirst("Id");
                if (userIdClaim == null)
                    return Unauthorized();

                var userId = int.Parse(userIdClaim.Value);

                // Users can only create goals for themselves
                if (userId != createSavingGoal.UserId)
                    return Forbid();

                var savingGoalId = await savingGoalService.AddAsync(
                    new MySavings.Entities.SavingGoal
                    {
                        Title = createSavingGoal.Title,
                        TargetAmount = createSavingGoal.TargetAmount,
                        CurrentAmount = 0,
                        UserId = createSavingGoal.UserId,
                        TargetDate = createSavingGoal.TargetDate,
                        Status = SavingGoalStatus.Active,
                    }
                );
                return Created("/", savingGoalId);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating saving goal: {ex.Message}\n{ex.StackTrace}");
                return StatusCode(500, $"Įvyko klaida kuriant tikslą: {ex.Message}");
            }
        }

        [HttpGet("get-by-id/{savingGoalId}")]
        [Authorize(Policy = "userOnly")]
        public async Task<IActionResult> GetByIdAsync(int savingGoalId)
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim.Value);

            var savingGoal = await savingGoalService.GetByIdAsync(savingGoalId);
            if (savingGoal == null)
                return NotFound();

            // Users can only view their own goals
            if (savingGoal.UserId != userId)
                return Forbid();

            return Ok(savingGoal);
        }

        [HttpGet("get-saving-goals/{userId}")]
        [Authorize(Policy = "userOnly")]
        public async Task<IActionResult> GetByUserIdAsync(
            int userId,
            [FromQuery] SavingGoalStatus? status,
            [FromQuery] DateTime? targetDateFrom,
            [FromQuery] DateTime? targetDateTo,
            [FromQuery] string? name,
            [FromQuery] string? sortBy)
        {
            try
            {
                var userIdClaim = User.FindFirst("Id");
                if (userIdClaim == null)
                    return Unauthorized();

                var currentUserId = int.Parse(userIdClaim.Value);

                // Users can only view their own goals
                if (userId != currentUserId)
                    return Forbid();

                var savingGoals = await savingGoalService.GetByUserIdAsync(
                    userId,
                    status,
                    targetDateFrom,
                    targetDateTo,
                    name,
                    sortBy);

                if (savingGoals == null || !savingGoals.Any())
                {
                    return NoContent();
                }

                return Ok(savingGoals);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("goals")]
        [Authorize(Policy = "userOnly")]
        public async Task<IActionResult> GetGoalsAsync()
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim.Value);

            var savingGoals = await savingGoalService.GetByUserIdAsync(
                userId,
                null,
                null,
                null,
                null,
                null);

            if (savingGoals == null || !savingGoals.Any())
                return Ok(new List<object>());

            return Ok(savingGoals);
        }

        [HttpPut("update-saving-goal")]
        [Authorize(Policy = "userOnly")]
        public async Task<IActionResult> UpdateAsync(
            [FromBody] UpdateSavingGoalRequest updateSavingGoal
        )
        {
            try
            {
                var userIdClaim = User.FindFirst("Id");
                if (userIdClaim == null)
                    return Unauthorized();

                var userId = int.Parse(userIdClaim.Value);

                var savingGoal = await savingGoalService.GetByIdAsync(updateSavingGoal.Id);
                if (savingGoal == null)
                    return NotFound();

                // Users can only update their own goals
                if (savingGoal.UserId != userId)
                    return Forbid();

                savingGoal.Title = updateSavingGoal.Title;
                savingGoal.TargetAmount = updateSavingGoal.TargetAmount;
                savingGoal.CurrentAmount = updateSavingGoal.CurrentAmount;
                savingGoal.TargetDate = updateSavingGoal.TargetDate;

                await savingGoalService.UpdateAsync(savingGoal);
                return Ok(savingGoal);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-saving-goal/{savingGoalId}")]
        [Authorize(Policy = "userOnly")]
        public async Task<IActionResult> DeleteAsync(int savingGoalId)
        {
            try
            {
                var userIdClaim = User.FindFirst("Id");
                if (userIdClaim == null)
                    return Unauthorized();

                var userId = int.Parse(userIdClaim.Value);

                var savingGoal = await savingGoalService.GetByIdAsync(savingGoalId);
                if (savingGoal == null)
                    return NotFound();

                // Users can only delete their own goals
                if (savingGoal.UserId != userId)
                    return Forbid();

                var result = await savingGoalService.DeleteAsync(savingGoalId);
                if (!result)
                    return NotFound();

                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
