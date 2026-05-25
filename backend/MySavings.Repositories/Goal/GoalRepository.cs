using Microsoft.EntityFrameworkCore;
using MySavings.Data;
using MySavings.Entities;

namespace MySavings.Repositories
{
    public class GoalRepository : IGoalRepository
    {
        private readonly MySavingsDbContext _dbContext;

        public GoalRepository(MySavingsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Goal>> GetByUserIdAsync(int userId)
        {
            return await _dbContext.Goals
                .Where(g => g.UserId == userId)
                .OrderBy(g => g.Deadline)
                .ToListAsync();
        }
    }
}