import { useEffect, useState } from "react";
import { getDeposits } from "../../services/Deposits";
import { getGoals } from "../../services/Goal";
import NavBar from "../Components/NavBar";
import SummaryMain from "../Components/SummaryMain";

function HomePage() {
  const [deposits, setDeposits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depositsRes, goalsRes] = await Promise.all([
          getDeposits(),
          getGoals(),
        ]);

        setDeposits(depositsRes.data);
        setGoals(goalsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeGoalsCount = goals.filter((g) => g.status === 0).length;
  const completedGoalsCount = goals.filter((g) => g.status === 1).length;

  const totalSavings = deposits.reduce(
    (sum, deposit) => sum + deposit.amount,
    0
  );


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
        
      </main>
    </>
  );
}
export default HomePage;
