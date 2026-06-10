import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateGoal } from "../../services/Goal";

function EditGoalModal({ isOpen, onClose, goal, onGoalUpdated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: goal?.title ?? "",
      targetAmount: goal?.targetAmount ?? "",
      targetDate: goal?.targetDate?.split("T")[0] ?? "",
    },
  });

  const [apiError, setApiError] = useState("");

  if (!isOpen || !goal) return null;

  const handleUpdate = async (formData) => {
    setApiError("");

    try {
      await updateGoal(goal.id, {
        title: formData.title,
        targetAmount: Number(formData.targetAmount),
        targetDate: formData.targetDate,
        currentAmount: goal.currentAmount,
      });
      reset();
      onGoalUpdated?.();
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
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="bg-[#141417] border border-zinc-800/80 rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Edit Goal</h2>
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 bg-zinc-900 border border-zinc-800 transition-colors" 
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(handleUpdate)} noValidate>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">Goal title</label>
              <input
                type="text"
                className={`w-full rounded-2xl border bg-[#1E1E22] py-3.5 px-4 text-zinc-100 placeholder-zinc-600 focus:border-[#FF4E11] focus:outline-none focus:ring-1 focus:ring-[#FF4E11] transition-all text-base ${
                  errors.title ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-zinc-800/60"
                }`}
                placeholder="Title"
                {...register("title", {
                  required: "Title is required.",
                })}
              />
              {errors.title && (
                <p className="text-red-400 text-xs font-medium mt-1.5 pl-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">Target amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium text-base">€</span>
                <input
                  type="number"
                  className={`w-full rounded-2xl border bg-[#1E1E22] py-3.5 pl-9 pr-4 text-zinc-100 placeholder-zinc-600 focus:border-[#FF4E11] focus:outline-none focus:ring-1 focus:ring-[#FF4E11] transition-all text-base ${
                    errors.targetAmount ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-zinc-800/60"
                  }`}
                  placeholder="Amount"
                  {...register("targetAmount", {
                    required: "Target amount is required.",
                    min: {
                      value: 0.01,
                      message: "Amount must be greater than 0.",
                    },
                  })}
                />
              </div>
              {errors.targetAmount && (
                <p className="text-red-400 text-xs font-medium mt-1.5 pl-1">
                  {errors.targetAmount.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 pl-1">Target date</label>
              <input
                type="date"
                className={`w-full rounded-2xl border bg-[#1E1E22] py-3.5 px-4 text-zinc-100 placeholder-zinc-600 focus:border-[#FF4E11] focus:outline-none focus:ring-1 focus:ring-[#FF4E11] transition-all text-base color-scheme-dark ${
                  errors.targetDate ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-zinc-800/60"
                }`}
                {...register("targetDate", {
                  required: "Target date is required.",
                  validate: (value) =>
                    new Date(value) > new Date() ||
                    "Target date must be in the future.",
                })}
              />
              {errors.targetDate && (
                <p className="text-red-400 text-xs font-medium mt-1.5 pl-1">
                  {errors.targetDate.message}
                </p>
              )}
            </div>
          </div>

          {apiError && (
            <p className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 w-full mt-4">
              {apiError}
            </p>
          )}

          <div className="flex gap-3 justify-end mt-8">
            <button
              type="button"
              className="px-5 py-3 rounded-full border border-zinc-800 bg-[#1E1E22] text-sm font-bold text-zinc-400 hover:text-zinc-200 hover:bg-[#27272C] transition-all active:scale-95"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#FF4E11] text-sm font-bold text-white shadow-lg shadow-[#FF4E11]/10 hover:bg-[#E24009] transition-all active:scale-95 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGoalModal;