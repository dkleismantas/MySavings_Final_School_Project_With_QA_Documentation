using Microsoft.EntityFrameworkCore;
using MySavings.Data;
 
namespace MySavings.Repositories.SavingsGoal;
 
public class SavingsGoalRepository : ISavingsGoalRepository
{
    private readonly MySavingsDbContext _context;
 
    public SavingsGoalRepository(MySavingsDbContext context)
    {
        _context = context;
    }
 
    public async Task<IEnumerable<Entities.SavingsGoal>> GetAllByUserIdAsync(int userId)
    {
        return await _context.SavingsGoals
            .Where(g => g.UserId == userId)
            .OrderByDescending(g => g.CreatedAt)
            .ToListAsync();
    }
}