const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "deadline", label: "Deadline" },
  { value: "amount", label: "Amount" },
  { value: "progress", label: "Progress" },
];

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

const getProgress = (goal) => {
  if (!goal.targetAmount || goal.targetAmount <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
};

const getStatusLabel = (status) => (status === 0 ? "Active" : "Completed");

const GoalsList = ({ goals, sortBy, onSortChange, loading }) => {
  return (
    <section className="mx-auto mt-6 w-full max-w-md px-4 sm:max-w-3xl">
      <div className="mb-5 space-y-4">
        <h2 className="text-3xl font-bold tracking-normal">Saving goals</h2>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="btn btn-outline rounded-full">
            Filters
          </button>

          <label className="relative">
            <span className="sr-only">Sort by</span>
            <select
              className="select select-bordered h-12 w-full rounded-full text-center font-semibold"
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-base-content/70">Loading goals...</div>
      ) : goals.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100 p-6 text-base-content/70">
          No saving goals yet.
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const progress = getProgress(goal);
            const isPrimaryCard = index === 0;

            return (
              <article
                key={goal.id}
                className={[
                  "card border shadow-sm",
                  isPrimaryCard
                    ? "border-primary/30 bg-primary text-primary-content"
                    : "border-base-300 bg-base-100 text-base-content",
                ].join(" ")}
              >
                <div className="card-body gap-5 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 text-xl font-bold leading-tight">
                      {goal.title}
                    </h3>
                    <span
                      className={[
                        "badge shrink-0 border-0",
                        isPrimaryCard
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
                        isPrimaryCard ? "progress-neutral" : "progress-primary",
                      ].join(" ")}
                      value={progress}
                      max="100"
                    />
                  </div>

                  <div
                    className={[
                      "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold",
                      isPrimaryCard ? "text-primary-content/90" : "text-base-content/70",
                    ].join(" ")}
                  >
                    <span>
                      {formatCurrency(goal.currentAmount)} of{" "}
                      {formatCurrency(goal.targetAmount)}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>Due {formatDate(goal.targetDate)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default GoalsList;
