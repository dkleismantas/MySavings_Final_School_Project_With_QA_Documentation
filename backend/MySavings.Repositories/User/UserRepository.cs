using MySavings.Data;
using MySavings.Entities;

namespace MySavings.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MySavingsDbContext dbContext;

        public UserRepository(MySavingsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<int> AddAsync(User user)
        {
     
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();
            return user.Id;
        }

        public async Task<User> GetAsync(int userId)
        {
            return await dbContext.Users.FindAsync(userId);
        }
    }
}