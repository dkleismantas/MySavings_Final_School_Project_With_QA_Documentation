namespace MySavings.API.Models.Deposit
{
    public class CreateDepositRequest
    {
        public int SavingGoalId { get; set; }

        public decimal Amount { get; set; }

        public string? Note { get; set; }
    }
}
