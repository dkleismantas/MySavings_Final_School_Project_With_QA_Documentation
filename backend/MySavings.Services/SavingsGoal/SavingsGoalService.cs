using MySavings.Repositories.SavingsGoal;
 
namespace MySavings.Services.SavingsGoal;
 
public class SavingsGoalService : ISavingsGoalService
{
    private readonly ISavingsGoalRepository _repository;
 
    public SavingsGoalService(ISavingsGoalRepository repository)
    {
        _repository = repository;
    }
 
    public async Task<IEnumerable<Entities.SavingsGoal>> GetGoalsAsync(int userId)
    {
        return await _repository.GetAllByUserIdAsync(userId);
    }
}