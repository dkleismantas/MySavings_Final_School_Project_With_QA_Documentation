using MySavings.Entities;

namespace MySavings.Services
{
    public interface IDepositService
    {
        Task<Deposit> CreateDepositAsync(int savingGoalId, decimal amount, string? note);

        Task<List<Deposit>> GetAllDepositsAsync();

        Task<List<Deposit>> GetDepositsByGoalIdAsync(int goalId);

        Task<List<Deposit>> GetDepositsByUserIdAsync(int userId);
    }
}
