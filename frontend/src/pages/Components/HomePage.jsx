import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getDeposits, getMonthlyDepositsSummary } from "../../services/Deposits";
import { getSavingGoalsByUserId } from "../../services/Goal";
import { getWalletByUserId, updateBalance } from "../../services/Wallet";

import NavBar from "../Components/NavBar";
import SummaryMain from "../Components/SummaryMain";
import MonthlyChart from "../Components/MonthlyChart";
import WalletCard from "../Components/WalletCard";
import GoalsList from "../Components/GoalsList";
import CreateGoalModal from "../Components/CreateGoalModal";

function HomePage() {
  const { user } = useContext(AuthContext);
  const [deposits, setDeposits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goalsLoading, setGoalsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [sortDirection, setSortDirection] = useState("desc");
  const [refreshKey, setRefreshKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const defaultGoalFilters = { status: "", targetDateFrom: "", targetDateTo: "", name: "" };
  const [goalFilters, setGoalFilters] = useState(defaultGoalFilters);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const [depositsRes, walletRes] = await Promise.all([getDeposits(), getWalletByUserId()]);
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
        const goalsRes = await getSavingGoalsByUserId({ ...goalFilters, sortBy, sortDirection });
        setGoals(goalsRes);
      } catch (error) {
        console.error("Failed to fetch sorted goals:", error);
      } finally {
        setGoalsLoading(false);
      }
    };
    fetchSortedGoals();
  }, [user, goalFilters, sortBy, sortDirection, refreshKey]);

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

  const handleGoalFilterChange = (name, value) => setGoalFilters((prev) => ({ ...prev, [name]: value }));
  const clearGoalFilters = () => setGoalFilters(defaultGoalFilters);

  const totalSavings = deposits.reduce((sum, deposit) => sum + deposit.amount, 0);
  const activeGoalsCount = goals.filter((g) => g.status === 0).length;
  const completedGoalsCount = goals.filter((g) => g.status !== 0).length;

  if (loading || (goalsLoading && goals.length === 0)) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center text-white font-medium">
        <p className="animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <NavBar onOpenModal={() => setModalOpen(true)} />
      
      <main className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Important Feature Action Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-zinc-900/20 p-5 sm:p-6 rounded-2xl border border-zinc-800/50 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Your Financial Overview</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">Track updates, control targets and monitor progress variants.</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-[#FF5722] hover:bg-[#e44d1e] text-white text-sm font-semibold transition-all shadow-md shadow-[#FF5722]/10 hover:scale-[1.02] active:scale-[0.98] self-start sm:self-auto"
          >
            + New goal
          </button>
        </div>

        {/* Dashboard Responsive Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Block: Wallet and Summary items column layout */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
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
          </div>

          {/* Right Block: Charts and Metric Visualizers */}
          <div className="lg:col-span-2 h-full">
            <MonthlyChart data={monthlyData} />
          </div>
        </div>

        {/* Goals Management Panel Section */}
        <div className="pt-4">
          <GoalsList
            goals={goals}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={setSortBy}
            onSortDirectionChange={setSortDirection}
            loading={goalsLoading}
            filters={goalFilters}
            onFilterChange={handleGoalFilterChange}
            onClearFilters={clearGoalFilters}
          />
        </div>
      </main>

      <CreateGoalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onGoalCreated={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}

export default HomePage;