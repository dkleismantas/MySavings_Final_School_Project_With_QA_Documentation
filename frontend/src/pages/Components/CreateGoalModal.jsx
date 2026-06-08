import { useState } from "react";
import { useForm } from "react-hook-form";
import { createGoal } from "../../services/Goal";

function CreateGoalModal({ isOpen, onClose, onGoalCreated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "", targetAmount: "", targetDate: "" },
  });

  const [apiError, setApiError] = useState("");

  if (!isOpen) return null;

  const handleCreate = async (formData) => {
    setApiError("");

    try {
      await createGoal(formData); // ✅ no userId needed
      reset();
      onGoalCreated?.(); // ✅ notify parent to refresh goals list
      onClose();
    } catch (error) {
      const message =
        error.response?.data?.error ?? "Server error. Please try again.";
      setApiError(message);
    }
  };

  const handleClose = () => {
    reset();
    setApiError("");
    onClose();
  };

  return (
    // backdrop
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      {/* modal box — stop click from closing when clicking inside */}
      <div
        className="bg-base-100 rounded-box w-full max-w-md p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Create New Goal</h2>
          <button className="btn btn-ghost btn-sm" onClick={handleClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit(handleCreate)} noValidate>
          <div className="flex flex-col gap-4">
            <div>
              <label className="label">Goal title</label>
              <input
                type="text"
                className={`input w-full ${errors.title ? "input-error" : ""}`}
                placeholder="Title"
                {...register("title", {
                  required: "Title is required.",
                })}
              />
              {errors.title && (
                <p className="text-error text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="label">Target amount</label>
              <input
                type="number"
                className={`input w-full ${errors.targetAmount ? "input-error" : ""}`}
                placeholder="Amount"
                {...register("targetAmount", {
                  required: "Target amount is required.",
                  min: { value: 0.01, message: "Amount must be greater than 0." },
                })}
              />
              {errors.targetAmount && (
                <p className="text-error text-sm mt-1">{errors.targetAmount.message}</p>
              )}
            </div>

            <div>
              <label className="label">Target date</label>
              <input
                type="date"
                className={`input w-full ${errors.targetDate ? "input-error" : ""}`}
                {...register("targetDate", {
                  required: "Target date is required.",
                  validate: (value) =>
                    new Date(value) > new Date() || "Target date must be in the future.",
                })}
              />
              {errors.targetDate && (
                <p className="text-error text-sm mt-1">{errors.targetDate.message}</p>
              )}
            </div>
          </div>

          {apiError && <p className="text-error text-sm mt-4">{apiError}</p>}

          <div className="flex gap-2 justify-end mt-6">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-neutral"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGoalModal;