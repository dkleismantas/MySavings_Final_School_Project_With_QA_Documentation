namespace MySavings.Entities
{
    public class Wallet
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public decimal TotalBalance { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        // Navigation property
        public User User { get; set; } = null!;
    }
}
