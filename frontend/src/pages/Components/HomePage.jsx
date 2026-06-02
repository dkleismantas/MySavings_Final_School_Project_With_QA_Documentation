import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { getDeposits, getMonthlyDepositsSummary } from "../../services/Deposits";
import { getSavingGoalsByUserId } from "../../services/Goal";
import { getWalletByUserId, updateBalance } from "../../services/Wallet";

import NavBar from "./NavBar";
import SummaryMain from "./SummaryMain";
import MonthlyChart from "./MonthlyChart";
import WalletCard from "./WalletCard";
import GoalCard from "./GoalCard";

function HomePage() {
  const { user } = useContext(AuthContext);

  const [deposits, setDeposits] = useState([]);
  const [goals, setGoals] = useState([]);
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
          getSavingGoalsByUserId(user.id),
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
  }, [user]);

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

        <MonthlyChart data={monthlyData} />

        <div className="flex flex-col gap-4 mt-6 px-4 pb-10">
        <h2 className="text-xl font-bold text-white mb-2">Your goals</h2>
        {goals.length === 0 ? (
          <p className="text-gray-400">No saving goals found.</p>
        ) : (
          goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))
        )}
      </div>
      </main>
    </>
  );
}

export default HomePage;