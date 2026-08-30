using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySavings.API.Models.SavingGoal;
using MySavings.Entities;
using MySavings.Services;

namespace MySavings.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "userOnly")]
    public class SavingGoalController : ControllerBase
    {
        private readonly ISavingGoalService _savingGoalService;

        public SavingGoalController(ISavingGoalService savingGoalService)
        {
            _savingGoalService = savingGoalService;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // POST: api/savinggoal/add-saving-goal
        [HttpPost("add-saving-goal")]
        public async Task<IActionResult> AddAsync([FromBody] CreateSavingGoalRequest request)
        {
            var savingGoalId = await _savingGoalService.AddAsync(
                new SavingGoal
                {
                    Title = request.Title,
                    TargetAmount = request.TargetAmount,
                    CurrentAmount = 0,
                    UserId = GetUserId(),
                    TargetDate = request.TargetDate,
                    Status = SavingGoalStatus.Active,
                }
            );

            return Created("/", savingGoalId);
        }

        // GET: api/savinggoal/get-by-id/1
        [HttpGet("get-by-id/{savingGoalId}")]
        public async Task<IActionResult> GetByIdAsync(int savingGoalId)
        {
            var savingGoal = await _savingGoalService.GetByIdAsync(savingGoalId);

            if (savingGoal == null)
                return NotFound();

            if (savingGoal.UserId != GetUserId())
                return Forbid();

            return Ok(savingGoal);
        }

        // GET: api/savinggoal/get-saving-goals
        [HttpGet("get-saving-goals")]
        public async Task<IActionResult> GetByUserIdAsync(
            [FromQuery] int? status,
            [FromQuery] DateTime? targetDateFrom,
            [FromQuery] DateTime? targetDateTo,
            [FromQuery] string? name,
            [FromQuery] string? sortBy,
            [FromQuery] string? sortDirection
        )
        {
            SavingGoalStatus? goalStatus = status.HasValue
                ? (SavingGoalStatus)status.Value
                : null;
            var savingGoals = await _savingGoalService.GetByUserIdAsync(
                GetUserId(),
                goalStatus,
                targetDateFrom,
                targetDateTo,
                name,
                sortBy,
                sortDirection
            );

            if (savingGoals == null || !savingGoals.Any())
                return Ok(new List<object>());

            return Ok(savingGoals);
        }

        // PUT: api/savinggoal/update-saving-goal
        [HttpPut("update-saving-goal")]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateSavingGoalRequest request)
        {
            var savingGoal = await _savingGoalService.GetByIdAsync(request.Id);

            if (savingGoal == null)
                return NotFound();

            if (savingGoal.UserId != GetUserId())
                return Forbid();

            savingGoal.Title = request.Title;
            savingGoal.TargetAmount = request.TargetAmount;
            savingGoal.TargetDate = request.TargetDate;

            await _savingGoalService.UpdateAsync(savingGoal);
            return Ok(savingGoal);
        }

        // DELETE: api/savinggoal/delete-saving-goal/1
        [HttpDelete("delete-saving-goal/{savingGoalId}")]
        public async Task<IActionResult> DeleteAsync(int savingGoalId)
        {
            await _savingGoalService.DeleteAsync(savingGoalId, GetUserId());
            return Ok();
        }
    }
}
