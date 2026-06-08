using MySavings.Entities;

namespace MySavings.Services
{
    public interface IWalletService
    {
        Task<Wallet?> GetWalletByUserIdAsync(int userId);

        Task<Wallet> AddBalanceAsync(int userId, decimal amount);

        Task<Wallet> UpdateBalanceAsync(int userId, decimal newBalance);
    }
}
