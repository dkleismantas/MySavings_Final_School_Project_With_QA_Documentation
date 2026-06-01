export default function GoalCard({ goal }) {
  const progress = Math.min(
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
    100
  );

  return (
    <div>
      <h3>{goal.title}</h3>
      <p>Target: {goal.targetAmount} €</p>
      <p>Amount Saved: {goal.currentAmount} €</p>
      <p>Deadline: {new Date(goal.targetDate).toLocaleDateString("lt-LT")}</p>
      <div style={{ background: "#eee", borderRadius: 8, height: 12 }}>
        <div
          style={{
            width: `${progress}%`,
            background: "#4caf50",
            height: "100%",
            borderRadius: 8,
          }}
        />
      </div>
      <p>{progress}%</p>
    </div>
  );
}