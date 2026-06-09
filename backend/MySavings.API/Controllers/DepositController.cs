using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySavings.API.Models.Deposit;
using MySavings.Services;

namespace MySavings.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "userOnly")]
    public class DepositController : ControllerBase
    {
        private readonly IDepositService _depositService;

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public DepositController(IDepositService depositService)
        {
            _depositService = depositService;
        }

        // POST: api/deposit/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateDeposit([FromBody] CreateDepositRequest request)
        {
            var deposit = await _depositService.CreateDepositAsync(
                GetUserId(),
                request.SavingGoalId,
                request.Amount,
                request.Note
            );

            return Ok(deposit);
        }

        // GET: api/deposit
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var deposits = await _depositService.GetAllDepositsAsync(GetUserId());

            return Ok(deposits);
        }

        // GET: api/deposit/goal/1
        [HttpGet("goal/{goalId}")]
        public async Task<IActionResult> GetByGoalId(int goalId)
        {
            var deposits = await _depositService.GetDepositsByGoalIdAsync(GetUserId(), goalId);

            return Ok(deposits);
        }

        // GET: api/deposit/monthly-summary
        [HttpGet("monthly-summary")]
        public async Task<IActionResult> GetMonthlySummary()
        {
            var summary = await _depositService.GetMonthlySummaryAsync(GetUserId());

            return Ok(summary);
        }
    }
}
