function GoalProgressCard({ goal }) {
  const progress =
    goal.targetAmount > 0
      ? Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
      : 0;

  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body gap-3">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold text-primary">
            {progress.toFixed(0)}%
          </span>
          <span className="text-base-content/70">
            €{remaining.toFixed(2)} remaining
          </span>
        </div>

        <progress
          className="progress progress-primary w-full"
          value={progress}
          max="100"
        />

        <div className="flex justify-between text-sm">
          <div>
            <p className="font-medium">€{goal.currentAmount.toFixed(2)}</p>
            <p className="text-base-content/60">Saved so far</p>
          </div>
          <div className="text-right">
            <p className="font-medium">of €{goal.targetAmount.toFixed(2)}</p>
            <p className="text-base-content/60">Target</p>
          </div>
        </div>

        {progress >= 100 && (
          <div className="alert alert-success">🎉 Goal completed!</div>
        )}
      </div>
    </div>
  );
}

export default GoalProgressCard;