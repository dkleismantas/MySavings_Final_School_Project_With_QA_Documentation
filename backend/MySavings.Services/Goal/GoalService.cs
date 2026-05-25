using MySavings.Repositories;

namespace MySavings.Services
{
    public class GoalService : IGoalService
    {
        private readonly IGoalRepository _goalRepository;

        public GoalService(IGoalRepository goalRepository)
        {
            _goalRepository = goalRepository;
        }

        public async Task<IEnumerable<GoalDto>> GetUserGoalsAsync(int userId)
        {
            var goals = await _goalRepository.GetByUserIdAsync(userId);

            return goals.Select(g => new GoalDto
            {
                Id = g.Id,
                Name = g.Name,
                TargetAmount = g.TargetAmount,
                CurrentAmount = g.CurrentAmount,
                ProgressPercent = g.TargetAmount > 0
                    ? Math.Round((g.CurrentAmount / g.TargetAmount) * 100, 1)
                    : 0,
                Deadline = g.Deadline
            });
        }
    }
}