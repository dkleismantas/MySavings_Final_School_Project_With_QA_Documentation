using MySavings.Entities;

namespace MySavings.Repositories
{
    public interface IWalletRepository
    {
        Task<Wallet?> GetByUserIdAsync(int userId);

        Task AddAsync(Wallet wallet);

        Task UpdateAsync(Wallet wallet);
    }
}
