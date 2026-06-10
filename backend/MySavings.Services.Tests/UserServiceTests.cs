using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using MySavings.Data;
using MySavings.Entities;
using MySavings.Repositories;

namespace MySavings.Services.Tests
{
    public class UserServiceTests
    {
        private readonly Mock<IUserRepository> userRepositoryMock =
            new Mock<IUserRepository>();
        private readonly Mock<IPasswordHasher<User>> passwordHasherMock =
            new Mock<IPasswordHasher<User>>();
        private readonly Mock<IWalletRepository> walletRepositoryMock =
            new Mock<IWalletRepository>();
        private readonly Mock<MySavingsDbContext> dbContextMock;
        private readonly UserService userService;

        public UserServiceTests()
        {
            var dbContextOptions = new DbContextOptionsBuilder<MySavingsDbContext>().Options;
            dbContextMock = new Mock<MySavingsDbContext>(dbContextOptions);

            userService = new UserService(
                userRepositoryMock.Object,
                walletRepositoryMock.Object,
                passwordHasherMock.Object,
                Mock.Of<ILogger<UserService>>(),
                dbContextMock.Object
            );
        }

        [Fact]
        public async Task AddAsync_ReturnsUserId_WhenUserIsAddedSuccessfully()
        {
            var userName = "testuser";
            var email = "testemail@test.com";
            var password = "testpassword";
            var expectedUserId = 50;

            userRepositoryMock.Setup(dbContext => dbContext.GetByUserNameAsync(userName))
                .ReturnsAsync((User)null);

            userRepositoryMock.Setup(dbContext => dbContext.GetByEmailAsync(email))
                .ReturnsAsync((User)null);

            passwordHasherMock.Setup(hasher => hasher.HashPassword(It.IsAny<User>(), password))
                .Returns("hashedpassword");

            userRepositoryMock.Setup(dbContext => dbContext.AddAsync(It.IsAny<User>()))
                .ReturnsAsync(expectedUserId);

            walletRepositoryMock.Setup(repository => repository.AddAsync(It.IsAny<Wallet>()))
                .Returns(Task.CompletedTask);

            dbContextMock.Setup(dbContext => dbContext.SaveChangesAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(1);

            var result = await userService.AddAsync(userName, email, password);

            Assert.Equal(expectedUserId, result);
        }

        [Fact]
        public async Task AddAsync_ThrowsArgumentException_WhenUserNameAlreadyExists()
        {
            var userName = "existinguser";
            var email = "testemail@test.com";
            var password = "testpassword";
            var existingUser = new User { Id = 50, Email = "existing@example.com", UserName = userName };

            userRepositoryMock.Setup(dbContext => dbContext.GetByUserNameAsync(userName))
                .ReturnsAsync(existingUser);

            var exception = await Assert.ThrowsAsync<ArgumentException>(async () =>
                await userService.AddAsync(userName, email, password)
            );

            Assert.Equal("Vartotojo vardas jau naudojamas.", exception.Message);
        }

        [Fact]
        public async Task AddAsync_ThrowsArgumentException_WhenEmailAlreadyExists()
        {
            var userName = "testuser";
            var email = "duplicate@email.com";
            var password = "testpassword";
            var existingUser = new User { Id = 50, Email = email, UserName = "existinguser" };

            userRepositoryMock.Setup(dbContext => dbContext.GetByUserNameAsync(userName))
                .ReturnsAsync((User)null);

            userRepositoryMock.Setup(dbContext => dbContext.GetByEmailAsync(email))
                .ReturnsAsync(existingUser);

            var exception = await Assert.ThrowsAsync<ArgumentException>(async () =>
                await userService.AddAsync(userName, email, password)
            );
            Assert.Equal("El. paštas jau naudojamas.", exception.Message);
        }

        [Fact]
        public async Task LoginAsync_ReturnsUser_WhenCredentialsAreValid()
        {
            var email = "testemail@test.com";
            var password = "testpassword";
            var user = new User { Id = 50, Email = email, UserName = "testuser" };

            userRepositoryMock.Setup(dbContext => dbContext.GetByEmailAsync(email))
                .ReturnsAsync(user);

            passwordHasherMock.Setup(hasher => hasher.VerifyHashedPassword(user,
                user.PasswordHash, password)).Returns(PasswordVerificationResult.Success);

            var result = await userService.LoginAsync(email, password);

            Assert.Equal(user, result);
        }

        [Fact]
        public async Task LoginAsync_ReturnsNull_WhenCredentialsAreInvalid()
        {
            var email = "testemail@test.com";
            var password = "testpassword";

            userRepositoryMock.Setup(dbContext => dbContext.GetByEmailAsync(email))
                .ReturnsAsync((User)null);

            var result = await userService.LoginAsync(email, password);

            Assert.Null(result);
        }
    }
}
