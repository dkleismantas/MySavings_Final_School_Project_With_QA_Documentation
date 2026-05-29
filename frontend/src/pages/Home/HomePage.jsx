import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { getDeposits, getMonthlyDepositsSummary } from "../../services/Deposits";
import { getSavingGoalsByUserId } from "../../services/Goal";
import { getWalletByUserId, updateBalance } from "../../services/Wallet";

import NavBar from "../Components/NavBar";
import SummaryMain from "../Components/SummaryMain";
import MonthlyChart from "../Components/MonthlyChart";
import WalletCard from "../Components/WalletCard";

function HomePage() {
  const { user } = useContext(AuthContext);

  const [deposits, setDeposits] = useState([]);
  const [goals, setGoals] = useState([]);

  const defaultGoalFilters = {
    status: "",
    targetDateFrom: "",
    targetDateTo: "",
    name: "",
  };

  const [goalFilters, setGoalFilters] = useState(defaultGoalFilters);

  const [wallet, setWallet] = useState(null);

  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // MAIN DATA FETCH
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const [depositsRes, goalsRes, walletRes] = await Promise.all([
          getDeposits(),
          getSavingGoalsByUserId(user.id, goalFilters),
          getWalletByUserId(user.id),
        ]);

        setDeposits(depositsRes.data);
        setGoals(goalsRes.data ?? goalsRes);
        setWallet(walletRes);

        // setNewBalance(walletRes.totalBalance);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, goalFilters]);

  // MONTHLY CHART DATA
  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const res = await getMonthlyDepositsSummary();
        setMonthlyData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMonthly();
  }, []);

  const handleGoalFilterChange = (name, value) => {
  setGoalFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
  };

  const clearGoalFilters = () => {
    setGoalFilters(defaultGoalFilters);
  };

  // STATS
  const totalSavings = deposits.reduce(
    (sum, deposit) => sum + deposit.amount,
    0
  );

  const activeGoalsCount = goals.filter((g) => g.status === 0).length;
  const completedGoalsCount = goals.filter((g) => g.status !== 0).length;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <main>
        <WalletCard
          wallet={wallet}
          onUpdate={async (newBalance) => {
            const updated = await updateBalance({
              userId: user.id,
              newBalance,
            });

            setWallet(updated.data ?? updated);
          }}
        />

        <SummaryMain
  totalSavings={totalSavings}
  activeCount={activeGoalsCount}
  completedCount={completedGoalsCount}
/>

<section style={{ margin: "20px 0" }}>
  <h2>Tikslų filtravimas</h2>

  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
    <input
      type="text"
      placeholder="Ieškoti pagal pavadinimą"
      value={goalFilters.name}
      onChange={(e) => handleGoalFilterChange("name", e.target.value)}
    />

    <select
      value={goalFilters.status}
      onChange={(e) => handleGoalFilterChange("status", e.target.value)}
    >
    <option value="">Visi statusai</option>
    <option value="0">Active</option>
    <option value="1">Completed</option>
    <option value="2">Paused</option>
    <option value="3">Cancelled</option>
    </select>

    <input
      type="date"
      value={goalFilters.targetDateFrom}
      onChange={(e) =>
        handleGoalFilterChange("targetDateFrom", e.target.value)
      }
    />

    <input
      type="date"
      value={goalFilters.targetDateTo}
      onChange={(e) =>
        handleGoalFilterChange("targetDateTo", e.target.value)
      }
    />

    <button type="button" onClick={clearGoalFilters}>
      Išvalyti filtrus
    </button>
  </div>
  <ul>
  {goals.map((goal) => (
    <li key={goal.id}>
      {goal.title} — {goal.status} — {goal.targetDate}
    </li>
  ))}
</ul>
</section>
        <MonthlyChart data={monthlyData} />
      </main>
    </>
  );
}

export default HomePage;