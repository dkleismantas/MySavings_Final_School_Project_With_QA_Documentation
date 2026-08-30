const getProgress = (goal) => {
  if (!goal.targetAmount || goal.targetAmount <= 0) return 0;
  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
};

const getStatusLabel = (status) => {
  switch (status) {
    case 0: return "Active";
    case 1: return "Completed";
    case 2: return "Paused";
    case 3: return "Cancelled";
    default: return "Unknown";
  }
};

const formatDate = (date) => {
  if (!date) return "No deadline";
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount ?? 0);

const GoalCard = ({ goal, isPrimary = false, onClick }) => {
  const progress = getProgress(goal);
  const dueDateText = formatDate(goal.targetDate);
  const goalStatus = getStatusLabel(goal.status);
  const isComplete = goal.status === 1 || progress === 100;

  return (
    <article
      onClick={onClick}
      className={`group w-full rounded-2xl p-6 transition-all duration-300 cursor-pointer border flex flex-col justify-between select-none min-h-[220px] ${
        isPrimary
          ? "bg-gradient-to-br from-[#ff6a3d] via-[#FF5722] to-[#e44d1e] border-transparent text-white shadow-xl shadow-[#FF5722]/10"
          : "bg-[#18181b] border-zinc-800 text-zinc-100 hover:border-zinc-700 shadow-sm"
      }`}
    >
      {/* Title Row container block */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold tracking-tight line-clamp-2 leading-snug group-hover:text-white">
          {goal.title}
        </h3>
        
        <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border shrink-0 ${
          isPrimary 
            ? "bg-white/10 border-white/20 text-white" 
            : isComplete 
              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400" 
              : "bg-zinc-900 border-zinc-800 text-zinc-400"
        }`}>
          {isComplete ? "Complete" : goalStatus}
        </span>
      </div>

      {/* Massive Progress Percent Visual Block */}
      <div className="my-5 space-y-3">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black tracking-tighter leading-none">
            {progress}
          </span>
          <span className={`text-xl font-bold ${isPrimary ? "text-orange-100" : "text-zinc-500"}`}>%</span>
        </div>
        
        {/* Customized Progress Track Bar Indicators */}
        <div className={`w-full h-2 rounded-full overflow-hidden ${isPrimary ? "bg-black/15" : "bg-zinc-900"}`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isPrimary 
                ? "bg-white" 
                : isComplete 
                  ? "bg-emerald-500" 
                  : "bg-[#FF5722]"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer Meta Row Items */}
      <div className={`flex flex-wrap items-center gap-2 text-xs font-semibold ${
        isPrimary ? "text-orange-100/90" : "text-zinc-400"
      }`}>
        <div>
          <span className={isPrimary ? "text-white font-bold" : "text-zinc-200 font-bold"}>
            {formatCurrency(goal.currentAmount)}
          </span>
          {" of "}
          <span>{formatCurrency(goal.targetAmount)}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`w-1 h-1 rounded-full ${isPrimary ? "bg-orange-200" : "bg-zinc-600"}`} />
          <span>Due {dueDateText}</span>
        </div>
      </div>
    </article>
  );
};

export default GoalCard;