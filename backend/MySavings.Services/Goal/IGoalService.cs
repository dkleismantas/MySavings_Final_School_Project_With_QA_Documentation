namespace MySavings.Services
{
    public class GoalDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }
        public decimal ProgressPercent { get; set; }
        public DateTime Deadline { get; set; }
    }

    public interface IGoalService
    {
        Task<IEnumerable<GoalDto>> GetUserGoalsAsync(int userId);
    }
}