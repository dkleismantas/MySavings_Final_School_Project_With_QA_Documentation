using System.ComponentModel.DataAnnotations;
namespace MySavings.API.Models.SavingGoal
{
    public class CreateSavingGoalRequest
    {
        public int UserId { get; set; }

        [Required(ErrorMessage = "Tikslo pavadinimas yra būtinas.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Norima sutaupyti suma yra būtina.")]
        public decimal TargetAmount { get; set; }

        [Required(ErrorMessage = "Įgyvendinimo data yra būtina.")]
        public DateTime TargetDate { get; set; }
        
        // public decimal CurrentAmount { get; set; }
    }
}