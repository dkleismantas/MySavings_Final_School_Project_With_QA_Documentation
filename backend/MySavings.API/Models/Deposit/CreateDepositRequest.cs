using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models.Deposit
{
    public class CreateDepositRequest
    {
        public required int SavingGoalId { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0.")]
        public required decimal Amount { get; set; }

        public string? Note { get; set; }
    }
}
