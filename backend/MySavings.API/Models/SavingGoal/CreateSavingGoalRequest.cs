using System.ComponentModel.DataAnnotations;
namespace MySavings.API.Models.SavingGoal
{
    public class CreateSavingGoalRequest
    {
        [Required(ErrorMessage = "Goal title is required.")]
        [StringLength(128, ErrorMessage = "Goal title cannot be longer than 128 characters.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Target amount is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0.")]
        public decimal TargetAmount { get; set; }

        [Required(ErrorMessage = "Target date is required.")]
        [FutureDate(ErrorMessage = "Date must be in the future.")]
        public DateTime TargetDate { get; set; }
    }
}
