using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySavings.Services;

namespace MySavings.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SavingGoalController : ControllerBase
    {
        private readonly ISavingGoalService _savingGoalService;

        public SavingGoalController(ISavingGoalService savingGoalService)
        {
            _savingGoalService = savingGoalService;
        }

        // 🔐 GET USER ID FROM JWT
        private int GetUserId()
        {
            var userIdClaim = User.FindFirst("Id")?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
                throw new UnauthorizedAccessException("Invalid token");

            return int.Parse(userIdClaim);
        }

        // CREATE
        [HttpPost("add-saving-goal")]
        public async Task<IActionResult> AddAsync([FromBody] CreateSavingGoalRequest request)
        {
            var userId = GetUserId();

            var savingGoalId = await _savingGoalService.AddAsync(request, userId);

            return CreatedAtRoute(
                "GetSavingGoalById",
                new { savingGoalId },
                new { id = savingGoalId }
            );
        }

        // GET BY ID
        [HttpGet("get-by-id/{savingGoalId}", Name = "GetSavingGoalById")]
        public async Task<IActionResult> GetByIdAsync(int savingGoalId)
        {
            var userId = GetUserId();

            var result = await _savingGoalService.GetByIdAsync(savingGoalId, userId);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // GET ALL FOR USER
        [HttpGet("get-saving-goals")]
        public async Task<IActionResult> GetByUserIdAsync()
        {
            var userId = GetUserId();

            var result = await _savingGoalService.GetByUserIdAsync(userId);

            return Ok(result);
        }

        // UPDATE
        [HttpPut("update-saving-goal")]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateSavingGoalRequest request)
        {
            var userId = GetUserId();

            var result = await _savingGoalService.UpdateAsync(request, userId);

            if (!result)
                return NotFound();

            return Ok();
        }

        // DELETE
        [HttpDelete("delete-saving-goal/{savingGoalId}")]
        public async Task<IActionResult> DeleteAsync(int savingGoalId)
        {
            var userId = GetUserId();

            var result = await _savingGoalService.DeleteAsync(savingGoalId, userId);

            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}