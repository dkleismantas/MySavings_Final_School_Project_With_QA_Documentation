using System.Runtime.CompilerServices;
using MySavings.Entities;

namespace MySavings.Repositories
{
    public interface IUserRepository
    {
        Task<int> AddAsync(User user);
        Task<User> GetByIdAsync(int userId);
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByUserNameAsync(string userName);
        Task<bool> UpdateAsync(User user);
        Task<bool> DeleteAsync(int userId);
    }
}