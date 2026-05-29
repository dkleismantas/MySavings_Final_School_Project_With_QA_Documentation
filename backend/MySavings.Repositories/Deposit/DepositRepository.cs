using Microsoft.EntityFrameworkCore;
using MySavings.Data;
using MySavings.Entities;

namespace MySavings.Repositories
{
    public class DepositRepository : IDepositRepository
    {
        private readonly MySavingsDbContext _context;

        public DepositRepository(MySavingsDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Deposit deposit)
        {
            await _context.Deposits.AddAsync(deposit);
        }

        public async Task<List<Deposit>> GetAllAsync()
        {
            return await _context.Deposits.Include(d => d.SavingGoal).ToListAsync();
        }

        public async Task<List<Deposit>> GetByGoalIdAsync(int goalId)
        {
            return await _context
                .Deposits.Where(d => d.SavingGoalId == goalId)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Deposit>> GetByUserIdAsync(int userId)
        {
            return await _context
                .Deposits.Include(d => d.SavingGoal)
                .Where(d => d.SavingGoal.UserId == userId)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
        }
    }
}
