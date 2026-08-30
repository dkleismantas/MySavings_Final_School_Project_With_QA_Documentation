using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MySavings.Data;
using MySavings.Entities;
using MySavings.Repositories;

namespace MySavings.Services
{
    public class UserService : IUserService
    {
        public readonly IUserRepository userRepository;
        private readonly IPasswordHasher<User> passwordHasher;
        private readonly IWalletRepository walletRepository;
        private readonly MySavingsDbContext _context;
        private readonly ILogger<UserService> _logger;

        public UserService(
            IUserRepository userRepository,
            IWalletRepository walletRepository,
            IPasswordHasher<User> passwordHasher,
            ILogger<UserService> logger,
            MySavingsDbContext context
        )
        {
            this.userRepository = userRepository;
            this.walletRepository = walletRepository;
            this.passwordHasher = passwordHasher;
            _context = context;
            _logger = logger;
        }

        public async Task<int> AddAsync(string userName, string email, string password)
        {
            if (await userRepository.GetByUserNameAsync(userName) != null)
            {
                throw new ArgumentException("User name is already taken.");
            }

            if (await userRepository.GetByEmailAsync(email) != null)
            {
                throw new ArgumentException("Email is already in use.");
            }

            var user = new User
            {
                UserName = userName,
                Email = email,
                Role = "user",
            };

            user.PasswordHash = passwordHasher.HashPassword(user, password);

            var userId = await userRepository.AddAsync(user);

            var wallet = new Wallet
            {
                UserId = userId,
                TotalBalance = 0,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            await walletRepository.AddAsync(wallet);

            await _context.SaveChangesAsync();

            _logger.LogInformation(
                "New user created. UserId: {UserId}, Email: {Email}, UserName: {UserName}",
                userId,
                email,
                userName
            );
            return userId;
        }

        public async Task<User> GetAsync(int userId)
        {
            return await userRepository.GetByIdAsync(userId);
        }

        public async Task<bool> ChangePasswordAsync(
            int userId,
            string currentPassword,
            string newPassword
        )
        {
            var user = await userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentException("User not found.");
            }
            if (
                !passwordHasher
                    .VerifyHashedPassword(user, user.PasswordHash, currentPassword)
                    .Equals(PasswordVerificationResult.Success)
            )
            {
                throw new ArgumentException("You entered an incorrect password.");
            }

            user.PasswordHash = passwordHasher.HashPassword(user, newPassword);
            return await userRepository.UpdateAsync(user);
        }

        public async Task<bool> ChangeEmailAsync(int userId, string email)
        {
            var user = await userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentException("User not found.");
            }
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (await userRepository.GetByEmailAsync(email) != null)
            {
                throw new ArgumentException("Email is already in use.");
            }

            user.Email = email;
            return await userRepository.UpdateAsync(user);
        }

        public async Task<bool> DeleteAsync(int userId)
        {
            if (await userRepository.GetByIdAsync(userId) == null)
            {
                return false;
            }
            return await userRepository.DeleteAsync(userId);
        }

        public async Task<User> LoginAsync(string userEmail, string password)
        {
            var user = await userRepository.GetByEmailAsync(userEmail);
            if (user == null)
            {
                return null;
            }

            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (result == PasswordVerificationResult.Success)
            {
                return user;
            }
            return null;
        }
    }
}
