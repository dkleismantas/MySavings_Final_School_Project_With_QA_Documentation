import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createGoal } from "../../services/Goal";

function CreateGoalModal({ isOpen, onClose, onGoalCreated }) {
  const titleId = useId();
  const amountId = useId();
  const dateId = useId();
  const modalTitleId = useId();
  const modalDescriptionId = useId();
  const apiErrorId = useId();
  const titleInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "", targetAmount: "", targetDate: "" },
  });

  const [apiError, setApiError] = useState("");
  const titleField = register("title", {
    required: "Title is required.",
    maxLength: { value: 128, message: "Title cannot exceed 128 characters." },
  });
  const amountField = register("targetAmount", {
    required: "Target amount is required.",
    min: { value: 0.01, message: "Amount must be greater than 0." },
  });
  const dateField = register("targetDate", {
    required: "Target date is required.",
    validate: (value) =>
      new Date(value) > new Date() || "Target date must be in the future.",
  });

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

  const handleClose = useCallback(() => {
    reset();
    setApiError("");
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (!isOpen) return undefined;

    titleInputRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-box bg-base-100 p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={modalDescriptionId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id={modalTitleId} className="text-lg font-bold">
            Create New Goal
          </h2>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleClose}
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>
        <p id={modalDescriptionId} className="sr-only">
          Fill in this form to create a new savings goal.
        </p>

        <form onSubmit={handleSubmit(handleCreate)} noValidate>
          <div className="flex flex-col gap-4">
            <div className="form-control">
              <label htmlFor={titleId} className="label">
                <span className="label-text font-medium">Goal title</span>
              </label>
              <input
                id={titleId}
                type="text"
                className={`input w-full ${errors.title ? "input-error" : ""}`}
                placeholder="Title"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? `${titleId}-error` : undefined}
                {...titleField}
                ref={(node) => {
                  titleField.ref(node);
                  titleInputRef.current = node;
                }}
              />
              {errors.title && (
                <p id={`${titleId}-error`} className="mt-1 text-sm text-error" role="alert">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor={amountId} className="label">
                <span className="label-text font-medium">Target amount</span>
              </label>
              <input
                id={amountId}
                type="number"
                inputMode="decimal"
                className={`input w-full ${errors.targetAmount ? "input-error" : ""}`}
                placeholder="Amount"
                aria-invalid={Boolean(errors.targetAmount)}
                aria-describedby={errors.targetAmount ? `${amountId}-error` : undefined}
                {...amountField}
              />
              {errors.targetAmount && (
                <p id={`${amountId}-error`} className="mt-1 text-sm text-error" role="alert">
                  {errors.targetAmount.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor={dateId} className="label">
                <span className="label-text font-medium">Target date</span>
              </label>
              <input
                id={dateId}
                type="date"
                className={`input w-full ${errors.targetDate ? "input-error" : ""}`}
                aria-invalid={Boolean(errors.targetDate)}
                aria-describedby={errors.targetDate ? `${dateId}-error` : undefined}
                {...dateField}
              />
              {errors.targetDate && (
                <p id={`${dateId}-error`} className="mt-1 text-sm text-error" role="alert">
                  {errors.targetDate.message}
                </p>
              )}
            </div>
          </div>

          {apiError && (
            <p id={apiErrorId} className="mt-4 text-sm text-error" role="alert">
              {apiError}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-2">
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
