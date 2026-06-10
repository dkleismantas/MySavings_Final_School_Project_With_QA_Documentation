import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../Components/NavBar";
import GoalCardDetails from "../Components/GoalCardDetails";
import AddDepositForm from "../Components/AddDepositForm";
import DepositHistory from "../Components/DepositHistory";
import EditGoalModal from "../Components/EditGoalModal";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";

import { getSavingGoalById } from "../../services/Goal";
import { getDepositsByGoalId, createDeposit } from "../../services/Deposits";
import { getWalletByUserId } from "../../services/Wallet";

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goalId = Number(id);

  const [goal, setGoal] = useState(null);
  const [deposits, setDeposits] = useState([]);
   const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [goalRes, depositsRes, walletRes] = await Promise.all([
          getSavingGoalById(goalId),
          getDepositsByGoalId(goalId),
          getWalletByUserId(),
        ]);

        if (!cancelled) {
          setGoal(goalRes);
          setDeposits(depositsRes);
          setWallet(walletRes);
        }
      } catch (error) {
        console.error("Failed to load goal data:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [goalId, refreshKey]);

  const handleSubmit = async ({ amount, note }) => {
    try {
      setSaving(true);
      await createDeposit({ savingGoalId: goalId, amount, note });
      setRefreshKey((k) => k + 1);
    } catch (error) {
      console.error("Failed to create deposit:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="p-6">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </>
    );
  }

  if (!goal) {
    return (
      <>
        <NavBar />
        <div className="p-6">
          <div className="alert alert-error">Goal not found</div>
        </div>
      </>
    );
  }

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleGoalUpdated = () => {
    setRefreshKey((k) => k + 1);
    showNotification("Goal updated successfully.");
  };

  const handleGoalDeleted = () => {
    navigate("/");
  };

  return (
    <>
      <NavBar />

      {notification && (
        <div className="toast toast-top toast-end z-50">
          <div
            className={`alert ${
              notification.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-end gap-2 mb-4">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setShowEditModal(true)}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-outline btn-error btn-sm"
            onClick={() => setShowDeleteModal(true)}
          >
            🗑️ Delete
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GoalCardDetails goal={goal} />
          </div>
          <div>
            <AddDepositForm 
              onSubmit={handleSubmit} 
              saving={saving} 
              goal={goal}                              
              walletBalance={wallet?.totalBalance ?? 0}
            />
          </div>
        </div>

        <DepositHistory deposits={deposits} />
      </main>

      <EditGoalModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        goal={goal}
        onGoalUpdated={handleGoalUpdated}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        goal={goal}
        onGoalDeleted={handleGoalDeleted}
      />
    </>
  );
}

export default DetailsPage;
