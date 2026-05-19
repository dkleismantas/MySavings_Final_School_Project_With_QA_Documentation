using System.ComponentModel.DataAnnotations;
namespace MySavings.API.Models.SavingGoal
{
    public class UpdateSavingGoalRequest
    {
        [Required(ErrorMessage = "Saving goal ID is required.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Target amount is required.")]
        public decimal TargetAmount { get; set; }

        [Required(ErrorMessage = "Target date is required.")]
        public DateTime TargetDate { get; set; }
        
        public decimal CurrentAmount { get; set; }
    }
}