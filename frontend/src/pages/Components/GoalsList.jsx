import { useNavigate } from "react-router-dom";
import GoalCard from "./GoalCard";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "deadline", label: "Deadline" },
  { value: "amount", label: "Amount" },
  { value: "progress", label: "Progress" },
];

const GoalsList = ({ goals, sortBy, onSortChange, loading }) => {
  const navigate = useNavigate();

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
              onChange={(e) => onSortChange(e.target.value)}
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
          {goals.map((goal, index) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              isPrimary={index === 0}
              onClick={() => navigate(`/details/${goal.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default GoalsList;