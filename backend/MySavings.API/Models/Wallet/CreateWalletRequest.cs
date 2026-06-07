using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models
{
    public class CreateWalletRequest
    {
        public required int UserId { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "InitialBalance must be greater than 0.")]
        public required decimal InitialBalance { get; set; }
    }
}
