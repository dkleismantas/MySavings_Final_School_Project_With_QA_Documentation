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
      </main>
    </>
  );
}

export default HomePage;