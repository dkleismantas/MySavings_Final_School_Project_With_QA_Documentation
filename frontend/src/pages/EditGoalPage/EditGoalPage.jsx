import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import EditGoalForm from "./EditGoalForm";
import { getSavingGoalById, deleteGoal } from "../../services/Goal";

function EditGoalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goalId = Number(id);

  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await getSavingGoalById(goalId);
        setGoal(response.data);
      } catch (err) {
        setError("Nepavyko įkelti tikslo duomenų");
        console.error("Error fetching goal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [goalId]);

  const handleDelete = async () => {
    if (!window.confirm("Ar tikrai norite ištrinti šį taupymo tikslą?")) {
      return;
    }

    try {
      await deleteGoal(goalId);
      alert("Tikslas sėkmingai ištrintas");
      navigate("/");
    } catch (err) {
      alert("Nepavyko ištrinti tikslo");
      console.error("Error deleting goal:", err);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="p-6">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="p-6">
          <div className="alert alert-error">{error}</div>
        </div>
      </>
    );
  }

  if (!goal) {
    return (
      <>
        <NavBar />
        <div className="p-6">
          <div className="alert alert-error">Tikslas nerasta</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="max-w-2xl mx-auto p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title mb-6">Redaguoti taupymo tikslą</h1>
            <EditGoalForm goal={goal} goalId={goalId} />

            <div className="divider"></div>

            <div className="flex justify-end">
              <button onClick={handleDelete} className="btn btn-error">
                Ištrinti tikslą
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EditGoalPage;
