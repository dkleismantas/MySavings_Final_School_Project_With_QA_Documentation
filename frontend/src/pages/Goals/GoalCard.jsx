import ProgressBar from "./ProgressBar";

const statusLabel = {
  active: { text: "aktyvus", bg: "#dcfce7", color: "#15803d" },
  completed: { text: "baigtas", bg: "#f3f4f6", color: "#6b7280" },
  cancelled: { text: "atšauktas", bg: "#fee2e2", color: "#dc2626" },
};

const GoalCard = ({ goal }) => {
  const status = statusLabel[goal.status] ?? statusLabel.active;
  const deadline = new Date(goal.deadline).toLocaleDateString("lt-LT");

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "16px 20px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div>
          <p style={{ fontWeight: 500, fontSize: "15px", margin: "0 0 4px" }}>{goal.title}</p>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Terminas: {deadline}</p>
        </div>
        <span style={{
          fontSize: "11px",
          background: status.bg,
          color: status.color,
          padding: "3px 8px",
          borderRadius: "6px",
          fontWeight: 500,
        }}>
          {status.text}
        </span>
      </div>

      <ProgressBar current={goal.currentAmount} target={goal.targetAmount} />
    </div>
  );
};

export default GoalCard;
