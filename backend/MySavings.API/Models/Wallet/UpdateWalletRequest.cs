namespace MySavings.API.Models
{
    public class UpdateWalletRequest
    {
        public int UserId { get; set; }
        public decimal NewBalance { get; set; }
    }
}
