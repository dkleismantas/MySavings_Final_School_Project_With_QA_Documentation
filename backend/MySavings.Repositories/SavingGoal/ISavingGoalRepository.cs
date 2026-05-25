using MySavings.Entities;

namespace MySavings.Repositories
{
    public interface ISavingGoalRepository
    {
        Task<int> AddAsync(SavingGoal savingGoal);
        Task<SavingGoal> GetByIdAsync(int savingGoalId);
        Task<IEnumerable<SavingGoal>> GetByUserIdAsync(int userId);
        Task<bool> UpdateAsync(SavingGoal savingGoal);
        Task<bool> DeleteAsync(int savingGoalId);
        Task<IEnumerable<SavingGoal>> GetAllAsync();
    }
}
