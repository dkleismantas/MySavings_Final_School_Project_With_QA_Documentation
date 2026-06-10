using MySavings.Entities;

namespace MySavings.Services
{
    public interface ISavingGoalService
    {
        Task<int> AddAsync(SavingGoal savingGoal);
        Task<SavingGoal> GetByIdAsync(int savingGoalId);

        Task<IEnumerable<SavingGoal>> GetByUserIdAsync(
            int userId,
            SavingGoalStatus? status,
            DateTime? targetDateFrom,
            DateTime? targetDateTo,
            string? name,
            string? sortBy,
            string? sortDirection);

        Task<IEnumerable<SavingGoal>> GetAllAsync();

        Task<bool> UpdateAsync(SavingGoal savingGoal);
        Task<bool> DeleteAsync(int savingGoalId, int userId);
    }
}
