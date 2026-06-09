using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models.Requests
{
    public class ChangePasswordRequest
    {
        [Required(ErrorMessage = "User ID is required.")]
        public int UserId { get; set; }
        [Required(ErrorMessage = "Current password is required.")]
        public string CurrentPassword { get; set; }

        [Required(ErrorMessage = "New password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string NewPassword { get; set; }
    }
}