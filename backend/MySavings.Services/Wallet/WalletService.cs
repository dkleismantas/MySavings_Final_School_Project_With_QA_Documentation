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

        public async Task<Wallet> CreateWalletAsync(int userId, decimal initialBalance)
        {
            if (initialBalance <= 0)
                throw new ArgumentException(
                    "InitialBalance must be greater than 0.",
                    nameof(initialBalance)
                );

            var exists = await _walletRepository.ExistsByUserIdAsync(userId);
            if (exists)
                throw new InvalidOperationException("Wallet already exists for this user.");

            var wallet = new Wallet
            {
                UserId = userId,
                TotalBalance = initialBalance,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            await _walletRepository.AddAsync(wallet);
            await _context.SaveChangesAsync();

            return wallet;
        }

        public async Task<Wallet> AddBalanceAsync(int userId, decimal amount)
        {
            if (amount <= 0)
                throw new ArgumentException("Amount must be greater than 0.", nameof(amount));

            var wallet =
                await _walletRepository.GetByUserIdAsync(userId)
                ?? throw new KeyNotFoundException("Wallet not found.");

            wallet.TotalBalance += amount;
            wallet.UpdatedAt = DateTime.UtcNow;

            await _walletRepository.UpdateAsync(wallet);
            await _context.SaveChangesAsync();

            return wallet;
        }

        public async Task<Wallet> SubtractBalanceAsync(int userId, decimal amount)
        {
            if (amount <= 0)
                throw new ArgumentException("Amount must be greater than 0.", nameof(amount));

            var wallet =
                await _walletRepository.GetByUserIdAsync(userId)
                ?? throw new KeyNotFoundException("Wallet not found.");

            if (wallet.TotalBalance < amount)
                throw new InvalidOperationException("Insufficient balance.");

            wallet.TotalBalance -= amount;
            wallet.UpdatedAt = DateTime.UtcNow;

            await _walletRepository.UpdateAsync(wallet);
            await _context.SaveChangesAsync();

            return wallet;
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
