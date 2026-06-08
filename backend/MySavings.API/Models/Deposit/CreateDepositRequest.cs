namespace MySavings.API.Models.Deposit
{
    public class CreateDepositRequest
    {
        public required int SavingGoalId { get; set; }

        public required decimal Amount { get; set; }

        public string? Note { get; set; }
    }
}
