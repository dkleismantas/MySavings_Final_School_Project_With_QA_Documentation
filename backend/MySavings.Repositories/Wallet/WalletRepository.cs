using Microsoft.EntityFrameworkCore;
using MySavings.Data;
using MySavings.Entities;

namespace MySavings.Repositories
{
    public class WalletRepository : IWalletRepository
    {
        private readonly MySavingsDbContext _context;

        public WalletRepository(MySavingsDbContext context)
        {
            _context = context;
        }

        public async Task<Wallet?> GetByUserIdAsync(int userId)
        {
            return await _context.Wallets.FirstOrDefaultAsync(w => w.UserId == userId);
        }

        public async Task<Wallet?> GetByIdAsync(int id)
        {
            return await _context.Wallets.FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task AddAsync(Wallet wallet)
        {
            await _context.Wallets.AddAsync(wallet);
        }

        public Task UpdateAsync(Wallet wallet)
        {
            _context.Wallets.Update(wallet);
            return Task.CompletedTask;
        }

        public async Task<bool> ExistsByUserIdAsync(int userId)
        {
            return await _context.Wallets.AnyAsync(w => w.UserId == userId);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
