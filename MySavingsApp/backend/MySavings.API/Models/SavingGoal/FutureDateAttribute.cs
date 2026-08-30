using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models.SavingGoal
{
    public class FutureDateAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is DateTime dateTime)
            {
                if (dateTime.Date <= DateTime.UtcNow.Date)
                {
                    return new ValidationResult(ErrorMessage ?? "Date must be in the future.");
                }
            }

            return ValidationResult.Success;
        }
    }
}
