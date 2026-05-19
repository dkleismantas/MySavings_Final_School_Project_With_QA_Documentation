using MySavings.Entities;
using MySavings.Services.Models;

namespace MySavings.Services
{
    public interface IUserService
    {
        Task<int> AddAsync(CreateUser createUser);
        Task<User> GetAsync(int userId);
    }
}