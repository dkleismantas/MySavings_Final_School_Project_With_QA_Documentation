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

const getProgress = (goal) => {
  if (!goal.targetAmount || goal.targetAmount <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
};

const GoalsList = ({ goals, sortBy, onSortChange, loading }) => {
  return (
    <section className="mt-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Saving goals</h2>

        <label className="form-control w-full sm:w-56">
          <span className="label-text mb-1">Sort by</span>
          <select
            className="select select-bordered w-full"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <div className="py-8 text-center text-base-content/70">Loading goals...</div>
      ) : goals.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100 p-6 text-base-content/70">
          No saving goals yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>Goal</th>
                <th>Deadline</th>
                <th>Amount</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => {
                const progress = getProgress(goal);

                return (
                  <tr key={goal.id}>
                    <td className="font-medium">{goal.title}</td>
                    <td>{formatDate(goal.targetDate)}</td>
                    <td>
                      €{goal.currentAmount} / €{goal.targetAmount}
                    </td>
                    <td className="min-w-44">
                      <div className="flex items-center gap-3">
                        <progress
                          className="progress progress-primary w-28"
                          value={progress}
                          max="100"
                        />
                        <span className="w-10 text-right text-sm">{progress}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default GoalsList;
