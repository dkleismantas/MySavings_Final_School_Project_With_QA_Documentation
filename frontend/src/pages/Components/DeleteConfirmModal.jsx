import { useState } from "react";
import { deleteGoal } from "../../services/Goal";

function DeleteConfirmModal({ isOpen, onClose, goal, onGoalDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [apiError, setApiError] = useState("");

  if (!isOpen || !goal) return null;

  const handleDelete = async () => {
    setApiError("");
    setIsDeleting(true);

    try {
      await deleteGoal(goal.id);
      onGoalDeleted?.();
      onClose();
    } catch (error) {
      const message =
        error.response?.data?.error ?? "Server error. Please try again.";
      setApiError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setApiError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="bg-[#141417] border border-zinc-800/80 rounded-3xl w-full max-w-sm p-6 md:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl text-red-400">
            ⚠️
          </div>
          <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Delete Goal</h2>
          <p className="text-sm font-medium text-zinc-400 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-zinc-200">"{goal.title}"</span>? This action
            cannot be undone.
          </p>

          {apiError && (
            <p className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 w-full">
              {apiError}
            </p>
          )}

          <div className="flex gap-3 w-full mt-4">
            <button
              type="button"
              className="flex-1 py-3 rounded-full border border-zinc-800 bg-[#1E1E22] text-sm font-bold text-zinc-400 hover:text-zinc-200 hover:bg-[#27272C] transition-all active:scale-[0.98]"
              onClick={handleClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 py-3 rounded-full bg-red-500 hover:bg-red-600 text-sm font-bold text-white shadow-lg shadow-red-500/10 transition-all active:scale-[0.98] disabled:opacity-50"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;