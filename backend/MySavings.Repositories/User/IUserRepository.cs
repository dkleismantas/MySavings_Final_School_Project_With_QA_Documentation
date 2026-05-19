using MySavings.Entities;

namespace MySavings.Repositories
{
    public interface IUserRepository
    {
        Task<int> AddAsync(User user);
        Task<User> GetAsync(int userId);
    }
}