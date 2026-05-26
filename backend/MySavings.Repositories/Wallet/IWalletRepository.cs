using MySavings.Entities;

namespace MySavings.Repositories
{
    public interface IWalletRepository
    {
        Task<Wallet?> GetByUserIdAsync(int userId);

        Task<Wallet?> GetByIdAsync(int id);

        Task AddAsync(Wallet wallet);

        Task UpdateAsync(Wallet wallet);

        Task<bool> ExistsByUserIdAsync(int userId);
    }
}
