using System.ComponentModel.DataAnnotations;
namespace MySavings.API.Models.SavingGoal
{
    public class CreateSavingGoalRequest
    {
        [Required(ErrorMessage = "Tikslo pavadinimas yra būtinas.")]
        [StringLength(128, ErrorMessage = "Tikslo pavadinimas negali būti ilgesnis nei 128 simboliai.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Norima sutaupyti suma yra būtina.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Suma turi būti didesnė už 0.")]
        public decimal TargetAmount { get; set; }

        [Required(ErrorMessage = "Įgyvendinimo data yra būtina.")]
        public DateTime TargetDate { get; set; }
    }
}
