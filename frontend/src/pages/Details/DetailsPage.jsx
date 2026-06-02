import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../Components/NavBar";
import GoalCardDetails from "../Components/GoalCardDetails";
import AddDepositForm from "../Components/AddDepositForm";
import DepositHistory from "../Components/DepositHistory";

import { getSavingGoalById } from "../../services/Goal";
import { getDepositsByGoalId, createDeposit } from "../../services/Deposits";

function DetailsPage() {
  const { id } = useParams();
  const goalId = Number(id);

  const [goal, setGoal] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [goalRes, depositsRes] = await Promise.all([
          getSavingGoalById(goalId),
          getDepositsByGoalId(goalId),
        ]);

        if (!cancelled) {
          setGoal(goalRes.data);
          setDeposits(depositsRes.data);
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

  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GoalCardDetails goal={goal} />
          </div>
          <div>
            <AddDepositForm onSubmit={handleSubmit} saving={saving} />
          </div>
        </div>

        <DepositHistory deposits={deposits} />
      </main>
    </>
  );
}

export default DetailsPage;