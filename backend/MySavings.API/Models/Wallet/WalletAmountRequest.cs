namespace MySavings.API.Models
{
    public class WalletAmountRequest
    {
        public int UserId { get; set; }
        public decimal Amount { get; set; }
    }
}
