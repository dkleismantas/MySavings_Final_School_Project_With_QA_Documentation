import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateGoal } from "../../services/Goal";

function EditGoalForm({ goal, goalId }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: goal.title,
      targetAmount: goal.targetAmount,
      targetDate: goal.targetDate?.split("T")[0],
      currentAmount: goal.currentAmount,
    },
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const updateGoalHandler = async (formData) => {
    setSuccessMessage("");
    setApiError("");

    try {
      const updateData = {
        id: goalId,
        title: formData.title,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount),
        targetDate: formData.targetDate,
      };

      const response = await updateGoal(updateData);
      if (response.status === 200) {
        setSuccessMessage("Tikslas sėkmingai atnaujintas.");
        setTimeout(() => {
          navigate(`/details/${goalId}`);
        }, 1500);
        return;
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      if (error.response && error.response.status === 400) {
        setApiError(error.response.data);
      } else {
        setApiError("Įvyko serverio klaida. Bandykite dar kartą.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(updateGoalHandler)} noValidate>
      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Tikslo pavadinimas</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Pavadinimas"
            id="title"
            {...register("title", {
              required: "Tikslo pavadinimas yra būtinas",
            })}
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Norima sutaupyti suma</span>
          </label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            placeholder="Suma"
            id="targetAmount"
            {...register("targetAmount", {
              required: "Norima sutaupyti suma yra būtina",
              min: {
                value: 0.01,
                message: "Suma turi būti teigiama",
              },
            })}
          />
          {errors.targetAmount && (
            <p className="text-error text-sm mt-1">
              {errors.targetAmount.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Jau sutaupyta suma</span>
          </label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            placeholder="Sutaupyta suma"
            id="currentAmount"
            {...register("currentAmount", {
              required: "Sutaupyta suma yra būtina",
              min: {
                value: 0,
                message: "Suma negali būti neigiama",
              },
            })}
          />
          {errors.currentAmount && (
            <p className="text-error text-sm mt-1">
              {errors.currentAmount.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Įgyvendinimo data</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            id="targetDate"
            {...register("targetDate", {
              required: "Įgyvendinimo data yra būtina",
            })}
          />
          {errors.targetDate && (
            <p className="text-error text-sm mt-1">
              {errors.targetDate.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full mt-6"
        >
          {isSubmitting ? "Atnaujinama..." : "Atnaujinti tikslą"}
        </button>

        {!!apiError && (
          <p className="text-error text-center mt-4">{apiError}</p>
        )}
        {!!successMessage && (
          <p className="text-success text-center mt-4">{successMessage}</p>
        )}
      </div>
    </form>
  );
}

export default EditGoalForm;
