using System.Globalization;
using MySavings.Data;
using MySavings.Entities;
using MySavings.Entities.Models;
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
            int userId,
            int savingGoalId,
            decimal amount,
            string? note
        )
        {
            if (amount <= 0)
                throw new ArgumentException("Amount must be greater than 0.", nameof(amount));

            var goal =
                await _goalRepository.GetByIdAsync(savingGoalId)
                ?? throw new KeyNotFoundException("Goal not found.");

            if (goal.UserId != userId)
                throw new UnauthorizedAccessException("You do not have access to this goal.");

            if (goal.Status == SavingGoalStatus.Completed)
                throw new InvalidOperationException("This goal is already completed.");

            var wallet =
                await _walletRepository.GetByUserIdAsync(userId)
                ?? throw new KeyNotFoundException("Wallet not found.");

            if (wallet.TotalBalance < amount)
                throw new InvalidOperationException("Insufficient wallet balance.");

            var remaining = goal.TargetAmount - goal.CurrentAmount;
            if (amount > remaining)
                throw new InvalidOperationException(
                    $"Amount exceeds remaining goal amount of {remaining:F2}."
                );

            var deposit = new Deposit
            {
                SavingGoalId = savingGoalId,
                Amount = amount,
                Note = note,
                CreatedAt = DateTime.UtcNow,
            };

            await _depositRepository.AddAsync(deposit);

            goal.CurrentAmount += amount;

            if (goal.CurrentAmount >= goal.TargetAmount)
                goal.Status = SavingGoalStatus.Completed;

            wallet.TotalBalance -= amount;
            wallet.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return deposit;
        }

        public async Task<List<Deposit>> GetAllDepositsAsync(int userId)
        {
            return await _depositRepository.GetByUserIdAsync(userId);
        }

        public async Task<List<Deposit>> GetDepositsByGoalIdAsync(int userId, int goalId)
        {
            var goal =
                await _goalRepository.GetByIdAsync(goalId)
                ?? throw new KeyNotFoundException("Goal not found.");

            if (goal.UserId != userId)
                throw new UnauthorizedAccessException("You do not have access to this goal.");

            return await _depositRepository.GetByGoalIdAsync(goalId);
        }

        public async Task<List<MonthlyDepositSummaryResponse>> GetMonthlySummaryAsync(int userId)
        {
            var deposits = await _depositRepository.GetByUserIdAsync(userId);

            var summary = deposits
                .GroupBy(d => new { d.CreatedAt.Year, d.CreatedAt.Month })
                .OrderBy(g => g.Key.Year)
                .ThenBy(g => g.Key.Month)
                .Select(g => new MonthlyDepositSummaryResponse
                {
                    Month = new DateTime(g.Key.Year, g.Key.Month, 1).ToString(
                        "MMMM yyyy",
                        CultureInfo.InvariantCulture
                    ),
                    TotalAmount = g.Sum(d => d.Amount),
                })
                .ToList();

            return summary;
        }
    }
}
