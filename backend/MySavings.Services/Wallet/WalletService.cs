using MySavings.Data;
using MySavings.Entities;
using MySavings.Repositories;

namespace MySavings.Services
{
    public class WalletService : IWalletService
    {
        private readonly IWalletRepository _walletRepository;
        private readonly MySavingsDbContext _context;

        public WalletService(IWalletRepository walletRepository, MySavingsDbContext context)
        {
            _walletRepository = walletRepository;
            _context = context;
        }

        public async Task<Wallet?> GetWalletByUserIdAsync(int userId)
        {
            return await _walletRepository.GetByUserIdAsync(userId);
        }

        public async Task<Wallet> UpdateBalanceAsync(int userId, decimal newBalance)
        {
            if (newBalance <= 0)
                throw new ArgumentException(
                    "NewBalance must be greater than 0.",
                    nameof(newBalance)
                );

            var wallet =
                await _walletRepository.GetByUserIdAsync(userId)
                ?? throw new KeyNotFoundException("Wallet not found.");

            wallet.TotalBalance = newBalance;
            wallet.UpdatedAt = DateTime.UtcNow;

            await _walletRepository.UpdateAsync(wallet);
            await _context.SaveChangesAsync();

            return wallet;
        }
    }
}
