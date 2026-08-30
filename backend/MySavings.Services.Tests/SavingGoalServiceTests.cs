using Microsoft.Extensions.Logging;
using Moq;
using MySavings.Entities;
using MySavings.Repositories;

namespace MySavings.Services.Tests
{
    public class SavingGoalServiceTests
    {
        private readonly Mock<ISavingGoalRepository> savingGoalRepositoryMock = new();
        private readonly Mock<IUserRepository> userRepositoryMock = new();
        private readonly Mock<IWalletService> walletServiceMock = new();
        private readonly SavingGoalService savingGoalService;

        public SavingGoalServiceTests()
        {
            savingGoalService = new SavingGoalService(
                savingGoalRepositoryMock.Object,
                userRepositoryMock.Object,
                walletServiceMock.Object,
                Mock.Of<ILogger<SavingGoalService>>()
            );
        }

        [Fact]
        public async Task GetByUserIdAsync_PassesSortParameterToRepository()
        {
            const int userId = 7;
            const string sortBy = "deadline";
            const string sortDirection = "asc";
            SavingGoalStatus? status = null;
            DateTime? targetDateFrom = null;
            DateTime? targetDateTo = null;
            string? name = null;

            var expectedGoals = new List<SavingGoal>
            {
                new()
                {
                    Id = 1,
                    Title = "Trip",
                    UserId = userId,
                    TargetAmount = 1000,
                    CurrentAmount = 250,
                    TargetDate = DateTime.UtcNow.AddMonths(2),
                },
            };

            savingGoalRepositoryMock
                .Setup(repository =>
                    repository.GetByUserIdAsync(
                        userId,
                        status,
                        targetDateFrom,
                        targetDateTo,
                        name,
                        sortBy,
                        sortDirection
                    )
                )
                .ReturnsAsync(expectedGoals);

            var result = await savingGoalService.GetByUserIdAsync(
                userId,
                status,
                targetDateFrom,
                targetDateTo,
                name,
                sortBy,
                sortDirection
            );

            Assert.Equal(expectedGoals, result);
            savingGoalRepositoryMock.Verify(
                repository =>
                    repository.GetByUserIdAsync(
                        userId,
                        status,
                        targetDateFrom,
                        targetDateTo,
                        name,
                        sortBy,
                        sortDirection
                    ),
                Times.Once
            );
        }

        [Fact]
        public async Task GetByUserIdAsync_ReturnsEmptyList_WhenRepositoryHasNoGoals()
        {
            const int userId = 7;
            const string sortBy = "newest";
            const string sortDirection = "desc";
            SavingGoalStatus? status = null;
            DateTime? targetDateFrom = null;
            DateTime? targetDateTo = null;
            string? name = null;

            var expectedGoals = Enumerable.Empty<SavingGoal>();

            savingGoalRepositoryMock
                .Setup(repository =>
                    repository.GetByUserIdAsync(
                        userId,
                        status,
                        targetDateFrom,
                        targetDateTo,
                        name,
                        sortBy,
                        sortDirection
                    )
                )
                .ReturnsAsync(expectedGoals);

            var result = await savingGoalService.GetByUserIdAsync(
                userId,
                status,
                targetDateFrom,
                targetDateTo,
                name,
                sortBy,
                sortDirection
            );

            Assert.Empty(result);
        }
    }
}
