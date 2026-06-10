using System.ComponentModel.DataAnnotations;

namespace MySavings.API.Models.SavingGoal
{
    public class UpdateSavingGoalRequest
    {
        [Required(ErrorMessage = "Saving goal ID is required.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(30, ErrorMessage = "Title cannot exceed 30 characters.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Target amount is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Target amount must be greater than 0.")]
        public decimal TargetAmount { get; set; }

        [Required(ErrorMessage = "Target date is required.")]
        [FutureDate(ErrorMessage = "Target date must be in the future.")]
        public DateTime TargetDate { get; set; }
    }
}
