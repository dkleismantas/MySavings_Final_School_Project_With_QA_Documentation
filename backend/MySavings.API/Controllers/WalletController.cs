using Microsoft.AspNetCore.Mvc;
using MySavings.API.Models;
using MySavings.Services;

namespace MySavings.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;

        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
        }

        // GET: api/wallet/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetWalletByUserId(int userId)
        {
            var wallet = await _walletService.GetWalletByUserIdAsync(userId);

            if (wallet == null)
                return NotFound("Wallet not found.");

            return Ok(wallet);
        }

        // POST: api/wallet/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateWallet([FromBody] CreateWalletRequest request)
        {
            var wallet = await _walletService.CreateWalletAsync(
                request.UserId,
                request.InitialBalance
            );

            return Ok(wallet);
        }

        // POST: api/wallet/add
        [HttpPost("add")]
        public async Task<IActionResult> AddBalance([FromBody] WalletAmountRequest request)
        {
            var wallet = await _walletService.AddBalanceAsync(request.UserId, request.Amount);

            return Ok(wallet);
        }

        // POST: api/wallet/subtract
        [HttpPost("subtract")]
        public async Task<IActionResult> SubtractBalance([FromBody] WalletAmountRequest request)
        {
            var wallet = await _walletService.SubtractBalanceAsync(request.UserId, request.Amount);

            return Ok(wallet);
        }

        // PUT: api/wallet/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateBalance([FromBody] UpdateWalletRequest request)
        {
            var wallet = await _walletService.UpdateBalanceAsync(
                request.UserId,
                request.NewBalance
            );

            return Ok(wallet);
        }
    }
}
