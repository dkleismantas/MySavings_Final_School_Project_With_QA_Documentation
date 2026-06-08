using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySavings.API.Models;
using MySavings.Services;

namespace MySavings.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "userOnly")]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
        }

        // GET: api/wallet
        [HttpGet]
        public async Task<IActionResult> GetWalletByUserId()
        {
            var wallet = await _walletService.GetWalletByUserIdAsync(GetUserId());

            if (wallet == null)
                return NotFound("Wallet not found.");

            return Ok(wallet);
        }

        // POST: api/wallet/add
        [HttpPost("add")]
        public async Task<IActionResult> AddBalance([FromBody] WalletAmountRequest request)
        {
            var wallet = await _walletService.AddBalanceAsync(GetUserId(), request.Amount);

            return Ok(wallet);
        }

        // PUT: api/wallet/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateBalance([FromBody] UpdateWalletRequest request)
        {
            var wallet = await _walletService.UpdateBalanceAsync(GetUserId(), request.NewBalance);

            return Ok(wallet);
        }
    }
}
