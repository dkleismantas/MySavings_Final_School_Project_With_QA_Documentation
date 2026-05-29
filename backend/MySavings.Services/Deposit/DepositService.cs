using MySavings.Data;
using MySavings.Entities;
using MySavings.Repositories;

namespace MySavings.Services
{
    public class DepositService : IDepositService
    {
        private readonly IDepositRepository _depositRepository;
        private readonly ISavingGoalRepository _goalRepository;
        private readonly IWalletRepository _walletRepository;
        private readonly MySavingsDbContext _context;

        public DepositService(
            IDepositRepository depositRepository,
            ISavingGoalRepository goalRepository,
            IWalletRepository walletRepository,
            MySavingsDbContext context
        )
        {
            _depositRepository = depositRepository;
            _goalRepository = goalRepository;
            _walletRepository = walletRepository;
            _context = context;
        }

        public async Task<Deposit> CreateDepositAsync(
            int savingGoalId,
            decimal amount,
            string? note
        )
        {
            if (amount <= 0)
                throw new Exception("Amount must be greater than 0.");

            var goal =
                await _goalRepository.GetByIdAsync(savingGoalId)
                ?? throw new Exception("Goal not found.");

            var wallet =
                await _walletRepository.GetByUserIdAsync(goal.UserId)
                ?? throw new Exception("Wallet not found.");

            if (wallet.TotalBalance < amount)
                throw new Exception("Insufficient wallet balance.");

            // CREATE DEPOSIT
            var deposit = new Deposit
            {
                SavingGoalId = savingGoalId,
                Amount = amount,
                Note = note,
                CreatedAt = DateTime.UtcNow,
            };

            await _depositRepository.AddAsync(deposit);

            // UPDATE GOAL
            goal.CurrentAmount += amount;

            if (goal.CurrentAmount >= goal.TargetAmount)
            {
                goal.Status = SavingGoalStatus.Completed;
            }

            // UPDATE WALLET
            wallet.TotalBalance -= amount;
            wallet.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return deposit;
        }

        public async Task<List<Deposit>> GetAllDepositsAsync()
        {
            return await _depositRepository.GetAllAsync();
        }

        public async Task<List<Deposit>> GetDepositsByGoalIdAsync(int goalId)
        {
            return await _depositRepository.GetByGoalIdAsync(goalId);
        }

        public async Task<List<Deposit>> GetDepositsByUserIdAsync(int userId)
        {
            return await _depositRepository.GetByUserIdAsync(userId);
        }
    }
}
