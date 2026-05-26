const ProgressBar = ({ current, target }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px", color: "#6b7280" }}>
        <span>€{current.toLocaleString()} iš €{target.toLocaleString()}</span>
        <span style={{ fontWeight: 500, color: "#111" }}>{percentage}%</span>
      </div>
      <div style={{ background: "#f3f4f6", borderRadius: "999px", height: "6px", overflow: "hidden" }}>
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: "999px",
            background: percentage === 100 ? "#9ca3af" : percentage >= 50 ? "#22c55e" : "#f59e0b",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;