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
      <div className="min-h-screen bg-[#0A0A0C]">
        <NavBar />
        <div className="flex items-center justify-center py-24 text-zinc-500 font-medium animate-pulse">
          Loading goal insights metrics...
        </div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="min-h-screen bg-[#0A0A0C]">
        <NavBar />
        <div className="max-w-7xl mx-auto p-6">
          <div className="rounded-2xl border border-red-900/30 bg-red-950/10 p-4 text-center text-red-400 font-medium">
            Goal specifications setup not found.
          </div>
        </div>
      </div>
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
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 font-sans antialiased pb-12">
      <NavBar />

      {notification && (
        <div className="fixed top-6 right-6 z-50">
          <div className={`rounded-xl px-5 py-3 shadow-2xl font-medium text-white border text-sm backdrop-blur-md ${
            notification.type === "success" 
              ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300" 
              : "bg-red-950/80 border-red-500/30 text-red-300"
          }`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Navigation Actions bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm md:text-base font-semibold text-zinc-400 hover:text-zinc-200 transition-colors group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-0.5">&larr;</span> Back
          </button>
          
          <div className="flex items-center gap-2.5">
            <button
              className="px-4 py-2 rounded-full border border-zinc-800 bg-[#141417] text-sm font-bold text-zinc-300 hover:bg-[#1E1E22] hover:text-zinc-100 transition-all active:scale-95"
              onClick={() => setShowEditModal(true)}
            >
              Edit goal
            </button>
            <button
              className="px-4 py-2 rounded-full border border-red-950/40 bg-red-950/10 text-sm font-bold text-red-400 hover:bg-red-950/20 transition-all active:scale-95"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete goal
            </button>
          </div>
        </div>

        {/* Dynamic Details Layout Grid split structure for laptop/desktop */}
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2">
            <GoalCardDetails goal={goal} />
          </div>
          <div className="w-full">
            {goal.status === 0 ? (
              <AddDepositForm
                onSubmit={handleSubmit}
                saving={saving}
                goal={goal}
                walletBalance={wallet?.totalBalance ?? 0}
              />
            ) : (
              <div className="rounded-3xl border border-zinc-800/80 bg-[#141417] p-6 md:p-8 text-center shadow-xl">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-400 tracking-tight mb-2">🎉 Goal Completed!</h2>
                <p className="text-zinc-400 text-sm font-medium">
                  This target milestone has been successfully reached. No further active transactions are needed.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Deposit History Stream row full span */}
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
    </div>
  );
}

export default DetailsPage;