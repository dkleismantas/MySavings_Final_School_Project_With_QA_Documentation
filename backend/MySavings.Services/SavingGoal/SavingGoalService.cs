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

        public async Task<IEnumerable<SavingGoal>> GetByUserIdAsync(int userId)
        {
            var goals = await _savingGoalRepository.GetByUserIdAsync(userId);

            if (!goals.Any())
                throw new ArgumentException("No saving goals found for this user.");

            return goals;
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
    }
}