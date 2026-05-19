using MySavings.Entities;
using MySavings.Repositories;

namespace MySavings.Services
{
    public class UserService : IUserService
    {
        public IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<int> AddAsync(Models.CreateUser createUser)
        {
            var user = new User
            {
                UserName = createUser.UserName,
                Email = createUser.Email,
                PasswordHash = createUser.Password,
                PasswordSalt = "salt",
                Iterations = 10000
            };
            return await userRepository.AddAsync(user);
        }

        public async Task<User> GetAsync(int userId)
        {
            return await userRepository.GetAsync(userId);
        }
    }
}