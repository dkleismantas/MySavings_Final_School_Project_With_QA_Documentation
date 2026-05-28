using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models.Requests
{
    public class ChangeEmailRequest
    {
        [Required(ErrorMessage = "User ID is required.")]
        public int UserId { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "New email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }
    }
}