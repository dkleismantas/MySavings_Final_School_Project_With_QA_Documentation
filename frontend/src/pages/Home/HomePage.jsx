import { useEffect, useState } from "react";
import { getDeposits } from "../../services/Deposits";
import NavBar from "../Components/NavBar";
import SummaryMain from "../Components/SummaryMain";

function HomePage() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await getDeposits();

        setDeposits(response.data);
      } catch (error) {
        console.error("Failed to fetch deposits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

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
        <SummaryMain totalSavings={totalSavings} />
      </main>
    </>
  );
}
export default HomePage;
