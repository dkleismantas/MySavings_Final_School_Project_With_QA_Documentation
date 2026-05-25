import { useState, useEffect } from "react";
import { getGoals } from "../../services/Goal";
import GoalCard from "./GoalCard";

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getGoals(1);
        setGoals(response.data ?? []);
      } catch (err) {
        setError(err.response?.data || err.message || "Cannot load goals.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="h-screen flex">
      <div className="w-full max-w-2xl m-auto p-4">
        <h2 className="text-2xl font-bold pb-4 text-center">My Goals</h2>

        {loading && (
          <div className="flex justify-center pt-10">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}

        {error && (
          <p className="text-orange-600 text-center">{error}</p>
        )}

        {!loading && !error && goals.length === 0 && (
          <p className="text-center text-base-content/60 pt-10">
            You have no created goals.
          </p>
        )}

        {!loading && !error && goals.length > 0 && (
          <div className="flex flex-col gap-4">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GoalsPage;