import { useEffect, useState } from "react";
import { getGoals } from "../../services/SavingsGoal";
import GoalCard from "./GoalCard";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getGoals();
        setGoals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <p style={{ color: "#6b7280" }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <p style={{ color: "#dc2626" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 500, marginBottom: "20px" }}>Savings Goals</h1>

      {goals.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "48px 16px",
          border: "1px dashed #d1d5db",
          borderRadius: "12px",
          color: "#6b7280",
        }}>
          <p style={{ fontSize: "15px", fontWeight: 500, margin: "0 0 6px" }}>You have no created goals</p>
          <p style={{ fontSize: "13px", margin: 0 }}>Create your first savings goal</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsPage;