namespace MySavings.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<SavingGoal> SavingGoals { get; set; } = new List<SavingGoal>();
        public string Role { get; set; }
    }
}