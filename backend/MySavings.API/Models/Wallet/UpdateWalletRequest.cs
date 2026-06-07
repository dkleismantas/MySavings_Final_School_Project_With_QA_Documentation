using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models
{
    public class UpdateWalletRequest
    {
        public required int UserId { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "NewBalance must be greater than 0.")]
        public required decimal NewBalance { get; set; }
    }
}
