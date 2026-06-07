using Moq;
using MySavings.Entities;
using MySavings.Repositories;

namespace MySavings.Services.Tests
{
    public class SavingGoalServiceTests
    {
        private readonly Mock<ISavingGoalRepository> savingGoalRepositoryMock =
            new Mock<ISavingGoalRepository>();
        private readonly Mock<IUserRepository> userRepositoryMock =
            new Mock<IUserRepository>();
        private readonly SavingGoalService savingGoalService;

        public SavingGoalServiceTests()
        {
            savingGoalService = new SavingGoalService(
                savingGoalRepositoryMock.Object,
                userRepositoryMock.Object
            );
        }

        [Fact]
        public async Task GetByUserIdAsync_PassesSortParameterToRepository()
        {
            const int userId = 7;
            const string sortBy = "deadline";
            var expectedGoals = new List<SavingGoal>
            {
                new SavingGoal
                {
                    Id = 1,
                    Title = "Trip",
                    UserId = userId,
                    TargetAmount = 1000,
                    CurrentAmount = 250,
                    TargetDate = DateTime.UtcNow.AddMonths(2)
                }
            };

            savingGoalRepositoryMock
                .Setup(repository => repository.GetByUserIdAsync(userId, sortBy))
                .ReturnsAsync(expectedGoals);

            var result = await savingGoalService.GetByUserIdAsync(userId, sortBy);

            Assert.Equal(expectedGoals, result);
            savingGoalRepositoryMock.Verify(
                repository => repository.GetByUserIdAsync(userId, sortBy),
                Times.Once
            );
        }

        [Fact]
        public async Task GetByUserIdAsync_ReturnsEmptyList_WhenRepositoryHasNoGoals()
        {
            const int userId = 7;
            var expectedGoals = Enumerable.Empty<SavingGoal>();

            savingGoalRepositoryMock
                .Setup(repository => repository.GetByUserIdAsync(userId, "newest"))
                .ReturnsAsync(expectedGoals);

            var result = await savingGoalService.GetByUserIdAsync(userId, "newest");

            Assert.Empty(result);
        }
    }
}
