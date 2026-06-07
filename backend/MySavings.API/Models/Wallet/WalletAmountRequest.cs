using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models
{
    public class WalletAmountRequest
    {
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0.")]
        public required decimal Amount { get; set; }
    }
}
