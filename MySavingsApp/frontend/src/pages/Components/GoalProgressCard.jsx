function GoalProgressCard({ goal }) {
  const progress =
    goal.targetAmount > 0
      ? Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
      : 0;

  const remaining = goal.targetAmount - goal.currentAmount;
  const isCompleted = progress >= 100;

  return (
    <div 
      className={`rounded-3xl p-6 md:p-8 shadow-xl ${
        isCompleted 
          ? "bg-zinc-900/50 border border-zinc-800/80" 
          : "bg-gradient-to-br from-[#FF4E11] via-[#FF5E2B] to-[#FF4E11] text-white"
      }`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-5xl md:text-6xl font-bold tracking-tight">
            {progress.toFixed(0)}%
          </span>
          <span className={`text-sm md:text-base font-medium ${isCompleted ? "text-zinc-400" : "text-white/80"}`}>
            {isCompleted ? "Goal achieved" : `€${remaining.toFixed(2)} remaining`}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className={`w-full h-3.5 rounded-full overflow-hidden ${isCompleted ? "bg-zinc-800" : "bg-black/15"}`}>
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isCompleted 
                ? "bg-emerald-500" 
                : "bg-white/90 stripe-pattern animate-stripes"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-end pt-2">
          <div>
            <p className="text-xl md:text-2xl font-bold tracking-tight">€{goal.currentAmount.toFixed(2)}</p>
            <p className={`text-xs md:text-sm font-medium mt-0.5 ${isCompleted ? "text-zinc-500" : "text-white/70"}`}>Saved so far</p>
          </div>
          <div className="text-right">
            <p className="text-xl md:text-2xl font-bold tracking-tight">of €{goal.targetAmount.toFixed(2)}</p>
            <p className={`text-xs md:text-sm font-medium mt-0.5 ${isCompleted ? "text-zinc-500" : "text-white/70"}`}>Target</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalProgressCard;