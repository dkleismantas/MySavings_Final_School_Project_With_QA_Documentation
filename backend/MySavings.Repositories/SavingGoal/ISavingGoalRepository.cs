using MySavings.Entities;

namespace MySavings.Repositories
{
    public interface ISavingGoalRepository
    {
        Task<int> AddAsync(SavingGoal savingGoal);
        Task<SavingGoal> GetByIdAsync(int savingGoalId);
        Task<IEnumerable<SavingGoal>> GetByUserIdAsync(
        int userId,
        SavingGoalStatus? status,
        DateTime? targetDateFrom,
        DateTime? targetDateTo,
        string? name);
        Task<bool> UpdateAsync(SavingGoal savingGoal);
        Task<bool> DeleteAsync(int savingGoalId);
    }
}

