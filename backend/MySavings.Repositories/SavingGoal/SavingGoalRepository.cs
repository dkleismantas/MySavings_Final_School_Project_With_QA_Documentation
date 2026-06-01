using Microsoft.EntityFrameworkCore;
using MySavings.Data;
using MySavings.Entities;

namespace MySavings.Repositories
{
    public class SavingGoalRepository : ISavingGoalRepository
    {
        private readonly MySavingsDbContext dbContext;

        public SavingGoalRepository(MySavingsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> AddAsync(SavingGoal savingGoal)
        {
            dbContext.SavingGoals.Add(savingGoal);
            await dbContext.SaveChangesAsync();
            return savingGoal.Id;
        }

        public async Task<SavingGoal> GetByIdAsync(int savingGoalId)
        {
            return await dbContext.SavingGoals.FindAsync(savingGoalId);
        }

        public async Task<IEnumerable<SavingGoal>> GetAllAsync()
        {
            return await dbContext.SavingGoals.ToListAsync();
        }

        public async Task<IEnumerable<SavingGoal>> GetByUserIdAsync(int userId)
        {
            return await dbContext.SavingGoals.Where(sg => sg.UserId == userId).ToListAsync();
        }

        public async Task<bool> UpdateAsync(SavingGoal savingGoal)
        {
            dbContext.SavingGoals.Update(savingGoal);
            int result = await dbContext.SaveChangesAsync();

            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteAsync(int savingGoalId)
{
    var entity = await dbContext.SavingGoals.FindAsync(savingGoalId);

    if (entity == null)
        return false;

    dbContext.SavingGoals.Remove(entity);
    await dbContext.SaveChangesAsync();

    return true;
}
    }
}