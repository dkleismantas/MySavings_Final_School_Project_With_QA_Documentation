import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { createGoal } from "../../services/Goal";

function CreateGoalForm() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      targetAmount: "",
      targetDate: "",
    },
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const createGoalHandler = async (formData) => {
    setSuccessMessage("");
    setApiError("");
    if (!user) {
      setApiError(
        "Vartotojas nėra autentifikuotas. Prisijunkite, kad galėtumėte sukurti tikslą.",
      );
      return;
    }
    const data = { ...formData, userId: user.id };

    try {
      const response = await createGoal(data);
      if (response.status === 201) {
        setSuccessMessage("Tikslas sėkmingai sukurtas.");
        reset();
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setApiError(error.response.data);
      } else {
        setApiError("Įvyko serverio klaida. Bandykite dar kartą.");
      }
    }
  };

  return (
    <div className="h-screen flex">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-auto">
        <h1>Sukurkite naują taupymo tikslą</h1>
        <form onSubmit={handleSubmit(createGoalHandler)} noValidate>
          <label className="label pt-5">Tikslo pavadinimas</label>
          <input
            type="text"
            className="input"
            placeholder="Pavadinimas"
            id="title"
            {...register("title", {
              required: "Tikslo pavadinimas yra būtinas",
            })}
          />
          <p className="text-orange-600">{errors.title?.message}</p>
          <label className="label pt-5">Norima sutaupyti suma</label>
          <input
            type="number"
            className="input"
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
          <p className="text-orange-600">{errors.targetAmount?.message}</p>
          <label className="label pt-5">Įgyvendinimo data</label>
          <input
            type="date"
            className="input"
            placeholder="Data"
            id="targetDate"
            {...register("targetDate", {
              required: "Įgyvendinimo data yra būtina",
            })}
          />
          <p className="text-orange-600">{errors.targetDate?.message}</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-neutral mt-4 w-full"
          >
            {isSubmitting ? "Kuriamas tikslas..." : "Kurti tikslą"}
          </button>{" "}
          {!!apiError && <p className="text-orange-600 pt-5">{apiError}</p>}
          {!!successMessage && (
            <p className="text-green-600 text-center pt-5">{successMessage}</p>
          )}
        </form>
      </fieldset>
    </div>
  );
}

export default CreateGoalForm;
