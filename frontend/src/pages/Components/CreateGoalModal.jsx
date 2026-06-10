import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createGoal } from "../../services/Goal";
import { FiX } from "react-icons/fi";

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
      await createGoal(formData);
      reset();
      onGoalCreated?.();
      onClose();
    } catch (error) {
      const message = error.response?.data?.error ?? "Server error. Please try again.";
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

    // Timeout delay guarantees focus runs smoothly after animation frames end
    const timer = setTimeout(() => titleInputRef.current?.focus(), 50);

    const onKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn"
      role="presentation"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#18181b] border border-zinc-800 p-6 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={modalDescriptionId}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header section with closing cross button triggers */}
        <div className="mb-6 flex items-center justify-between">
          <h2 id={modalTitleId} className="text-xl font-bold tracking-tight text-white">
            Create New Goal
          </h2>
          <button
            type="button"
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
            onClick={handleClose}
            aria-label="Close dialog"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <p id={modalDescriptionId} className="sr-only">
          Fill in this form to create a new savings goal.
        </p>

        <form onSubmit={handleSubmit(handleCreate)} noValidate className="space-y-4">
          
          {/* Goal Title Field */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor={titleId} className="text-sm font-medium text-gray-300">
              Goal title
            </label>
            <input
              id={titleId}
              type="text"
              className="w-full px-4 py-2.5 rounded-xl bg-[#101010] border border-zinc-800 text-white focus:outline-none focus:border-[#FF5722] transition-colors placeholder-zinc-600 text-sm"
              placeholder="e.g., New Laptop, Summer Trip"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? `${titleId}-error` : undefined}
              {...titleField}
              ref={(node) => {
                titleField.ref(node);
                titleInputRef.current = node;
              }}
            />
            {errors.title && (
              <p id={`${titleId}-error`} className="text-xs text-[#FF5722] font-medium" role="alert">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Target Amount Field */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor={amountId} className="text-sm font-medium text-gray-300">
              Target amount (€)
            </label>
            <input
              id={amountId}
              type="number"
              inputMode="decimal"
              className="w-full px-4 py-2.5 rounded-xl bg-[#101010] border border-zinc-800 text-white focus:outline-none focus:border-[#FF5722] transition-colors placeholder-zinc-600 text-sm"
              placeholder="0.00"
              aria-invalid={Boolean(errors.targetAmount)}
              aria-describedby={errors.targetAmount ? `${amountId}-error` : undefined}
              {...amountField}
            />
            {errors.targetAmount && (
              <p id={`${amountId}-error`} className="text-xs text-[#FF5722] font-medium" role="alert">
                {errors.targetAmount.message}
              </p>
            )}
          </div>

          {/* Target Date Field */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor={dateId} className="text-sm font-medium text-gray-300">
              Target date
            </label>
            <input
              id={dateId}
              type="date"
              className="w-full px-4 py-2.5 rounded-xl bg-[#101010] border border-zinc-800 text-white focus:outline-none focus:border-[#FF5722] transition-colors text-sm color-scheme-dark secondary-date-picker"
              style={{ colorScheme: 'dark' }} // Native browser date icon override dark utility
              aria-invalid={Boolean(errors.targetDate)}
              aria-describedby={errors.targetDate ? `${dateId}-error` : undefined}
              {...dateField}
            />
            {errors.targetDate && (
              <p id={`${dateId}-error`} className="text-xs text-[#FF5722] font-medium" role="alert">
                {errors.targetDate.message}
              </p>
            )}
          </div>

          {/* API Server Warning Responses */}
          {apiError && (
            <p id={apiErrorId} className="text-sm text-[#FF5722] bg-[#2a1410] p-3 rounded-xl border border-[#FF5722]/20 font-medium" role="alert">
              {apiError}
            </p>
          )}

          {/* Action Trigger Buttons Container */}
          <div className="mt-6 flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-900 transition-colors"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold bg-[#FF5722] hover:bg-[#e44d1e] text-white rounded-xl transition-all shadow-lg shadow-[#FF5722]/10"
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