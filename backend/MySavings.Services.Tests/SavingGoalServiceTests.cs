using Moq;
using MySavings.Entities;
using MySavings.Repositories;

namespace MySavings.Services.Tests
{
    public class SavingGoalServiceTests
    {
        private readonly Mock<ISavingGoalRepository> savingGoalRepositoryMock = new();
        private readonly Mock<IUserRepository> userRepositoryMock = new();
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
                .Setup(repo => repo.GetByUserIdAsync(
                    userId,
                    null,
                    null,
                    null,
                    null,
                    sortBy))
                .ReturnsAsync(expectedGoals);

            var result = await savingGoalService.GetByUserIdAsync(
                userId, null, null, null, null, sortBy);

            Assert.Equal(expectedGoals, result);
            savingGoalRepositoryMock.Verify(
                repo => repo.GetByUserIdAsync(
                    userId, null, null, null, null, sortBy),
                Times.Once
            );
        }

        [Fact]
        public async Task GetByUserIdAsync_ReturnsEmptyList_WhenRepositoryHasNoGoals()
        {
            const int userId = 7;
            var expectedGoals = Enumerable.Empty<SavingGoal>();

            savingGoalRepositoryMock
                .Setup(repo => repo.GetByUserIdAsync(
                    userId, null, null, null, null, "newest"))
                .ReturnsAsync(expectedGoals);

            var result = await savingGoalService.GetByUserIdAsync(
                userId, null, null, null, null, "newest");

            Assert.Empty(result);
        }
    }
}
