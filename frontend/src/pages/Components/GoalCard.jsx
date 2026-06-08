const getProgress = (goal) => {
  if (!goal.targetAmount || goal.targetAmount <= 0) return 0;
  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
};

const getStatusLabel = (status) => (status === 0 ? "Active" : "Completed");

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

  return (
    <article
      onClick={onClick}
      className={[
        "card border shadow-sm transition-opacity hover:opacity-90 cursor-pointer",
        isPrimary
          ? "border-primary/30 bg-primary text-primary-content"
          : "border-base-300 bg-base-100 text-base-content",
      ].join(" ")}
    >
      <div className="card-body gap-5 p-5">
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
            {getStatusLabel(goal.status)}
          </span>
        </div>

        <div>
          <p className="mb-3 text-5xl font-bold leading-none">{progress}%</p>
          <progress
            className={[
              "progress h-3 w-full",
              isPrimary ? "progress-neutral" : "progress-primary",
            ].join(" ")}
            value={progress}
            max="100"
          />
        </div>

        <div
          className={[
            "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold",
            isPrimary ? "text-primary-content/90" : "text-base-content/70",
          ].join(" ")}
        >
          <span>
            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
          </span>
          <span aria-hidden="true">•</span>
          <span>Due {formatDate(goal.targetDate)}</span>
        </div>
      </div>
    </article>
  );
};

export default GoalCard;