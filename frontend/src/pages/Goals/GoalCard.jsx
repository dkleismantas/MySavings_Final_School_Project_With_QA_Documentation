function GoalCard({ goal }) {
  const daysLeft = Math.ceil(
    (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="card bg-base-200 border border-base-300 rounded-box p-4">
      <h3 className="font-bold text-lg">{goal.name}</h3>

      <p className="text-sm pt-2">
        {goal.currentAmount} / {goal.targetAmount} €
      </p>

      {/* Progreso baras */}
      <div className="w-full bg-base-300 rounded-full h-3 mt-3">
        <div
          className="bg-primary h-3 rounded-full transition-all"
          style={{ width: `${Math.min(goal.progressPercent, 100)}%` }}
        />
      </div>
      <p className="text-sm pt-1">{goal.progressPercent}%</p>

      <p className="text-sm pt-2 text-base-content/60">
        {daysLeft > 0 ? `Left ${daysLeft} d.` : "Deadline passed"}
      </p>
    </div>
  );
}

export default GoalCard;