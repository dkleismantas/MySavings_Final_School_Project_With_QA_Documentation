using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models.Requests
{
    public class ChangeEmailRequest
    {
        [Required(ErrorMessage = "User ID is required.")]
        public int UserId { get; set; }
        [Required(ErrorMessage = "New email is required.")]
        [RegularExpression(@"/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i", ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }
    }
}