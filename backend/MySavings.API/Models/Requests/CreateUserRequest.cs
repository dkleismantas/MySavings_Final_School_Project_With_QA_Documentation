using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models.Requests
{
    public class CreateUserRequest
    {
        [Required(ErrorMessage = "Username is required.")]
        [RegularExpression("^[a-zA-Z][a-zA-Z0-9._-]*$",
            ErrorMessage = "Username must start with a letter and can only contain letters, numbers, dots, hyphens, or underscores.")]
        [StringLength(30, MinimumLength = 3,
            ErrorMessage = "Username must be between 3 and 30 characters long.")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string? Password { get; set; }
    }
}