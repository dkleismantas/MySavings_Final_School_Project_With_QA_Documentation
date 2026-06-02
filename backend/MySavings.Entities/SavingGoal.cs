namespace MySavings.Entities
{
    public class SavingGoal
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public SavingGoalStatus Status { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }
        public DateTime TargetDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}