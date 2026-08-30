using MySavings.Entities;
using MySavings.Entities.Models;

namespace MySavings.Services
{
    public interface IDepositService
    {
        Task<Deposit> CreateDepositAsync(
            int userId,
            int savingGoalId,
            decimal amount,
            string? note
        );

        Task<List<Deposit>> GetAllDepositsAsync(int userId);

        Task<List<Deposit>> GetDepositsByGoalIdAsync(int userId, int goalId);

        Task<List<MonthlyDepositSummaryResponse>> GetMonthlySummaryAsync(int userId);
    }
}
