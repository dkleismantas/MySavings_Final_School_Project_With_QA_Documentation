using MySavings.Entities;

namespace MySavings.Repositories
{
    public interface IGoalRepository
    {
        Task<IEnumerable<Goal>> GetByUserIdAsync(int userId);
    }
}