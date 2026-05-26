using MySavings.Entities;
 
namespace MySavings.Services.SavingsGoal;
 
public interface ISavingsGoalService
{
    Task<IEnumerable<Entities.SavingsGoal>> GetGoalsAsync(int userId);
}