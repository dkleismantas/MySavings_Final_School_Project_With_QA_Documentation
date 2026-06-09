import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  getDeposits,
  getMonthlyDepositsSummary,
} from "../../services/Deposits";
import { getSavingGoalsByUserId } from "../../services/Goal";
import { getWalletByUserId, updateBalance } from "../../services/Wallet";

import NavBar from "../Components/NavBar";
import SummaryMain from "../Components/SummaryMain";
import MonthlyChart from "../Components/MonthlyChart";
import WalletCard from "../Components/WalletCard";
import GoalsList from "../Components/GoalsList";

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
  const [goalsLoading, setGoalsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [refreshKey, setRefreshKey] = useState(0);


  // MAIN DATA FETCH
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const [depositsRes, walletRes] = await Promise.all([
          getDeposits(),
          getWalletByUserId(),
        ]);

        setDeposits(depositsRes);
        setWallet(walletRes);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchSortedGoals = async () => {
      if (!user?.id) return;

      try {
        setGoalsLoading(true);
        const goalsRes = await getSavingGoalsByUserId({ ...goalFilters, sortBy });
        setGoals(goalsRes);
      } catch (error) {
        console.error("Failed to fetch sorted goals:", error);
      } finally {
        setGoalsLoading(false);
      }
    };

    fetchSortedGoals();
  }, [user, goalFilters, sortBy, refreshKey]);

  // MONTHLY CHART DATA
  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const res = await getMonthlyDepositsSummary();
        setMonthlyData(res);
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
    0,
  );

  const activeGoalsCount = goals.filter((g) => g.status === 0).length;
  const completedGoalsCount = goals.filter((g) => g.status !== 0).length;

  if (loading || (goalsLoading && goals.length === 0)) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar onGoalCreated={() => setRefreshKey((k) => k + 1)}/>
      <main>
        <WalletCard
          wallet={wallet}
          onUpdate={async (newBalance) => {
            const updated = await updateBalance({ newBalance });
            setWallet(updated);
          }}
        />

        <SummaryMain
          totalSavings={totalSavings}
          activeCount={activeGoalsCount}
          completedCount={completedGoalsCount}
        />

        <MonthlyChart data={monthlyData} />

        <GoalsList
          goals={goals}
          sortBy={sortBy}
          onSortChange={setSortBy}
          loading={goalsLoading}
          filters={goalFilters}
          onFilterChange={handleGoalFilterChange}
          onClearFilters={clearGoalFilters}
        />
      </main>
    </>
  );
}

export default HomePage;
