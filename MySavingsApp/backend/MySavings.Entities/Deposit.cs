using System.Text.Json.Serialization;

namespace MySavings.Entities
{
    public class Deposit
    {
        public int Id { get; set; }

        public decimal Amount { get; set; }

        public string? Note { get; set; }

        public DateTime CreatedAt { get; set; }

        public int SavingGoalId { get; set; }

        [JsonIgnore]
        public SavingGoal SavingGoal { get; set; } = null!;
    }
}
