using MySavings.Entities;
 
namespace MySavings.Repositories.SavingsGoal;
 
public interface ISavingsGoalRepository
{
    Task<IEnumerable<Entities.SavingsGoal>> GetAllByUserIdAsync(int userId);
}