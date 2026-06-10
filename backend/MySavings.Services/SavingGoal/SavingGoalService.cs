using Microsoft.Extensions.Logging;
using MySavings.Entities;
using MySavings.Repositories;
using MySavings.Services;

namespace MySavings.Services
{
    public class SavingGoalService : ISavingGoalService
    {
        private readonly ISavingGoalRepository _savingGoalRepository;
        private readonly IUserRepository _userRepository;
        private readonly IWalletService _walletService;

        private readonly ILogger<SavingGoalService> _logger;

        public SavingGoalService(
             ISavingGoalRepository savingGoalRepository,
             IUserRepository userRepository,
             IWalletService walletService,
             ILogger<SavingGoalService> logger
         )
        {
            _savingGoalRepository = savingGoalRepository;
            _userRepository = userRepository;
            _walletService = walletService;
            _logger = logger;
        }

        public async Task<int> AddAsync(SavingGoal savingGoal)
        {
            if (savingGoal == null)
            {
                throw new ArgumentException("Saving goal cannot be empty.");
            }

            var userExists = await _userRepository.GetByIdAsync(savingGoal.UserId);


            _logger.LogInformation(
                "Adding new saving goal. UserId: {UserId}, GoalName: {GoalName}",
                savingGoal.UserId,
                savingGoal.Title
            );

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
            string? name,
            string? sortBy,
            string? sortDirection)
        {
            return await _savingGoalRepository.GetByUserIdAsync(
                userId,
                status,
                targetDateFrom,
                targetDateTo,
                name,
                sortBy,
                sortDirection);
        }

        public async Task<bool> UpdateAsync(SavingGoal savingGoal)
        {
            if (await _savingGoalRepository.GetByIdAsync(savingGoal.Id) == null)
            {
                throw new ArgumentException("Saving goal not found.");
            }
            return await _savingGoalRepository.UpdateAsync(savingGoal);
        }

        public async Task<bool> DeleteAsync(int savingGoalId, int userId)
        {
            var goal = await _savingGoalRepository.GetByIdAsync(savingGoalId);
            if (goal == null)
            {
                throw new KeyNotFoundException("Saving goal not found.");
            }

            if (goal.UserId != userId)
            {
                throw new UnauthorizedAccessException("You do not own this saving goal.");
            }

            var deleted = await _savingGoalRepository.DeleteAsync(savingGoalId);

            if (deleted && goal.CurrentAmount > 0)
            {
                var wallet = await _walletService.GetWalletByUserIdAsync(userId);
                if (wallet != null)
                {
                    await _walletService.UpdateBalanceAsync(userId, wallet.TotalBalance + goal.CurrentAmount);
                }
            }

            return deleted;
        }

        public async Task<IEnumerable<SavingGoal>> GetAllAsync()
        {
            return await _savingGoalRepository.GetAllAsync();
        }
    }
}
