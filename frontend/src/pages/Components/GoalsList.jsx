import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalCard from "./GoalCard";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "deadline", label: "Deadline" },
  { value: "amount", label: "Amount" },
  { value: "progress", label: "Progress" },
];

const GoalsList = ({
  goals,
  sortBy,
  onSortChange,
  loading,
  filters = {},
  onFilterChange,
  onClearFilters,
}) => {
  const navigate = useNavigate();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <section className="mx-auto mt-6 w-full max-w-md px-4 sm:max-w-3xl">
      <div className="mb-5 space-y-4">
        <h2 className="text-3xl font-bold tracking-normal">Saving goals</h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="btn btn-outline rounded-full"
            onClick={() => setIsFiltersOpen((prev) => !prev)}
          >
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

        {isFiltersOpen && (
          <div className="rounded-box border border-base-300 bg-base-100 p-4">
            <div className="space-y-3">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Search by name"
                value={filters.name}
                onChange={(e) => onFilterChange("name", e.target.value)}
              />

              <select
                className="select select-bordered w-full"
                value={filters.status}
                onChange={(e) => onFilterChange("status", e.target.value)}
              >
                <option value="">All goals</option>
                <option value="0">In progress</option>
                <option value="1">Completed</option>
                <option value="2">Paused</option>
                <option value="3">Cancelled</option>
              </select>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={filters.targetDateFrom}
                  onChange={(e) =>
                    onFilterChange("targetDateFrom", e.target.value)
                  }
                />

                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={filters.targetDateTo}
                  onChange={(e) =>
                    onFilterChange("targetDateTo", e.target.value)
                  }
                />
              </div>

              <button
                type="button"
                className="btn btn-ghost w-full"
                onClick={onClearFilters}
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-8 text-center text-base-content/70">
          Loading goals...
        </div>
      ) : goals.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100 p-6 text-base-content/70">
          No saving goals found.
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