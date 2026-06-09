const getProgress = (goal) => {
  if (!goal.targetAmount || goal.targetAmount <= 0) return 0;
  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
};

const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return "Active";
    case 1:
      return "Completed";
    case 2:
      return "Paused";
    case 3:
      return "Cancelled";
    default:
      return "Unknown";
  }
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));

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

  return (
    <article
      className={[
        "card border shadow-sm transition-opacity hover:opacity-90",
        isPrimary
          ? "border-primary/30 bg-primary text-primary-content"
          : "border-base-300 bg-base-100 text-base-content",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onClick}
        className="card-body w-full cursor-pointer gap-5 p-5 text-left"
        aria-label={`Open goal ${goal.title}. Status ${goalStatus}. ${progress}% complete. Due ${dueDateText}.`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-xl font-bold leading-tight">{goal.title}</h3>
          <span
            className={[
              "badge shrink-0 border-0",
              isPrimary
                ? "bg-primary-content/20 text-primary-content"
                : "badge-primary",
            ].join(" ")}
          >
            {goalStatus}
          </span>
        </div>

        <div>
          <p className="mb-3 text-4xl font-bold leading-none sm:text-5xl">{progress}%</p>
          <progress
            className={[
              "progress h-3 w-full",
              isPrimary ? "progress-neutral" : "progress-primary",
            ].join(" ")}
            value={progress}
            max="100"
            aria-label={`Progress ${progress} percent`}
          />
        </div>

        <div
          className={[
            "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold",
            isPrimary ? "text-primary-content" : "text-base-content",
          ].join(" ")}
        >
          <span>
            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
          </span>
          <span aria-hidden="true">•</span>
          <span>Due {dueDateText}</span>
        </div>
      </button>
    </article>
  );
};

export default GoalCard;
