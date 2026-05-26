import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getDeposits, getMonthlyDepositsSummary } from "../../services/Deposits";
import { getSavingGoalsByUserId } from "../../services/Goal"; 

import NavBar from "../Components/NavBar";
import SummaryMain from "../Components/SummaryMain";
import MonthlyChart from "../Components/MonthlyChart";

function HomePage() {
  const { user } = useContext(AuthContext);

  const [deposits, setDeposits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const [depositsRes, goalsRes] = await Promise.all([
          getDeposits(),
          getSavingGoalsByUserId(user.id), // laikinai userId = 1
        ]);

        setDeposits(depositsRes.data);
        setGoals(goalsRes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMonthlyDepositsSummary();

        setMonthlyData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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