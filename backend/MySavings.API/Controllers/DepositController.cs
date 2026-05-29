using Microsoft.AspNetCore.Mvc;
using MySavings.API.Models.Deposit;
using MySavings.Services;

namespace MySavings.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepositController : ControllerBase
    {
        private readonly IDepositService _depositService;

        public DepositController(IDepositService depositService)
        {
            _depositService = depositService;
        }

        // POST: api/deposit/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateDeposit([FromBody] CreateDepositRequest request)
        {
            var deposit = await _depositService.CreateDepositAsync(
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
            var deposits = await _depositService.GetAllDepositsAsync();

            return Ok(deposits);
        }

        // GET: api/deposit/goal/1
        [HttpGet("goal/{goalId}")]
        public async Task<IActionResult> GetByGoalId(int goalId)
        {
            var deposits = await _depositService.GetDepositsByGoalIdAsync(goalId);

            return Ok(deposits);
        }

        // GET: api/deposit/user/1
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var deposits = await _depositService.GetDepositsByUserIdAsync(userId);

            return Ok(deposits);
        }
    }
}
