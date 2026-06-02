using MySavings.Entities;
using MySavings.Repositories;
using MySavings.Services;

namespace MySavings.Services
{
    public class SavingGoalService : ISavingGoalService
    {
        private readonly ISavingGoalRepository _savingGoalRepository;
        private readonly IUserRepository _userRepository;
        public SavingGoalService(ISavingGoalRepository savingGoalRepository, IUserRepository userRepository)
        {
            _savingGoalRepository = savingGoalRepository;
            _userRepository = userRepository;
        }

        public async Task<int> AddAsync(SavingGoal savingGoal)
        {
            if (savingGoal == null)
            {
                throw new ArgumentException("Saving goal cannot be empty.");
            }

            var userExists = await _userRepository.GetByIdAsync(savingGoal.UserId);
            if (userExists == null)
            {
                throw new ArgumentException("Invalid user ID.");
            }

            return await _savingGoalRepository.AddAsync(savingGoal);
        }

        public async Task<SavingGoal> GetByIdAsync(int savingGoalId)
        {
            var goal = await _savingGoalRepository.GetByIdAsync(savingGoalId);

            if (goal == null)
                throw new ArgumentException("Saving goal not found.");

            return goal;
        }

        public async Task<IEnumerable<SavingGoal>> GetByUserIdAsync(
            int userId,
            SavingGoalStatus? status,
            DateTime? targetDateFrom,
            DateTime? targetDateTo,
            string? name)
        {
        return await _savingGoalRepository.GetByUserIdAsync(
        userId,
        status,
        targetDateFrom,
        targetDateTo,
        name);
        }

        public async Task<bool> UpdateAsync(SavingGoal savingGoal)
        {
            if (await _savingGoalRepository.GetByIdAsync(savingGoal.Id) == null)
            {
                throw new ArgumentException("Saving goal not found.");
            }
            return await _savingGoalRepository.UpdateAsync(savingGoal);
        }

        public async Task<bool> DeleteAsync(int savingGoalId)
        {
            if (await _savingGoalRepository.GetByIdAsync(savingGoalId) == null)
            {
                throw new ArgumentException("Saving goal not found.");
            }
            return await _savingGoalRepository.DeleteAsync(savingGoalId);
        }

        public async Task<IEnumerable<SavingGoal>> GetAllAsync()
{
    return await _savingGoalRepository.GetAllAsync();
}
    }
}