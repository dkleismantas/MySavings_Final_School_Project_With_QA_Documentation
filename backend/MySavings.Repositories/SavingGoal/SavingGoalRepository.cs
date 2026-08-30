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

        public async Task<IEnumerable<SavingGoal>> GetByUserIdAsync(
            int userId,
            SavingGoalStatus? status,
            DateTime? targetDateFrom,
            DateTime? targetDateTo,
            string? name,
            string? sortBy,
            string? sortDirection)
        {
            var query = dbContext.SavingGoals
                .Where(sg => sg.UserId == userId)
                .AsQueryable();

            if (status.HasValue)
            {
                query = query.Where(sg => sg.Status == status.Value);
            }

            if (targetDateFrom.HasValue)
            {
                query = query.Where(sg => sg.TargetDate >= targetDateFrom.Value.Date);
            }

            if (targetDateTo.HasValue)
            {
                var toDate = targetDateTo.Value.Date.AddDays(1);
                query = query.Where(sg => sg.TargetDate < toDate);
            }

            if (!string.IsNullOrWhiteSpace(name))
            {
                var searchName = name.Trim();
                query = query.Where(sg => sg.Title.Contains(searchName));
            }

            sortBy = sortBy?.Trim().ToLowerInvariant();
            var sortField = string.IsNullOrWhiteSpace(sortBy) ? "newest" : sortBy;

            var direction = sortDirection?.Trim().ToLowerInvariant();
            var isDescending = direction switch
            {
                null or "" => sortField switch
                {
                    "deadline" => false,  // deadline defaults to ascending (earliest first)
                    _ => true             // newest, amount, progress default to descending
                },
                "desc" or "descending" => true,
                "asc" or "ascending" => false,
                _ => throw new ArgumentException("Invalid sort direction. Use 'asc', 'ascending', 'desc', or 'descending'."),
            };

            query = sortField switch
            {
                "newest" => isDescending
                    ? query.OrderByDescending(sg => sg.Id)
                    : query.OrderBy(sg => sg.Id),
                "deadline" => isDescending
                    ? query.OrderByDescending(sg => sg.TargetDate)
                    : query.OrderBy(sg => sg.TargetDate),
                "amount" => isDescending
                    ? query.OrderByDescending(sg => sg.TargetAmount)
                    : query.OrderBy(sg => sg.TargetAmount),
                "progress" => isDescending
                    ? query.OrderByDescending(sg =>
                        sg.TargetAmount > 0 ? sg.CurrentAmount / sg.TargetAmount : 0)
                    : query.OrderBy(sg =>
                        sg.TargetAmount > 0 ? sg.CurrentAmount / sg.TargetAmount : 0),
                _ => throw new ArgumentException("Invalid sort parameter. Use 'newest', 'deadline', 'amount', or 'progress'."),
            };

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<SavingGoal>> GetAllAsync()
        {
            return await dbContext.SavingGoals.ToListAsync();
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
            {
                return false;
            }

            dbContext.SavingGoals.Remove(entity);
            await dbContext.SaveChangesAsync();

            return true;
        }
    }
}
