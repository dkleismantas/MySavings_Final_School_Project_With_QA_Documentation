namespace MySavings.API.Models
{
    public class CreateWalletRequest
    {
        public int UserId { get; set; }
        public decimal InitialBalance { get; set; }
    }
}
