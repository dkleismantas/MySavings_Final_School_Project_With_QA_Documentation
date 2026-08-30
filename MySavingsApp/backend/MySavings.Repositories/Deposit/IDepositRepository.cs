using MySavings.Entities;

namespace MySavings.Repositories
{
    public interface IDepositRepository
    {
        Task AddAsync(Deposit deposit);

        Task<List<Deposit>> GetAllAsync();

        Task<List<Deposit>> GetByGoalIdAsync(int goalId);

        Task<List<Deposit>> GetByUserIdAsync(int userId);
    }
}
