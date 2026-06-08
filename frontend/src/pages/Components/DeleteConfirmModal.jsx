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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-base-100 rounded-box w-full max-w-sm p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-lg font-bold">Delete Goal</h2>
          <p className="text-sm opacity-70">
            Are you sure you want to delete{" "}
            <span className="font-semibold">"{goal.title}"</span>? This action
            cannot be undone.
          </p>

          {apiError && <p className="text-error text-sm">{apiError}</p>}

          <div className="flex gap-2 justify-center mt-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-error"
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
