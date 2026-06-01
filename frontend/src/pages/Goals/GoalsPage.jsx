import { useEffect, useState } from "react";
import { getGoals } from "../../services/Goal";
import GoalCard from "./GoalCard";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGoals()
      .then((data) => setGoals(data))
      .catch(() => setGoals([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (goals.length === 0)
    return <p>No saving goals found.</p>;

  return (
    <div>
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}