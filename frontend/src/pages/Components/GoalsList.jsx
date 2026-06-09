import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalCard from "./GoalCard";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "deadline", label: "Deadline" },
  { value: "amount", label: "Amount" },
  { value: "progress", label: "Progress" },
];

const sortDirectionOptions = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

const GoalsList = ({
  goals,
  sortBy,
  sortDirection,
  onSortChange,
  onSortDirectionChange,
  loading,
  filters = {},
  onFilterChange,
  onClearFilters,
}) => {
  const navigate = useNavigate();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filterPanelId = useId();
  const filterButtonId = useId();
  const sortById = useId();
  const sortDirectionId = useId();
  const nameFilterId = useId();
  const statusFilterId = useId();
  const dateFromId = useId();
  const dateToId = useId();

  return (
    <section className="mx-auto mt-6 w-full max-w-4xl">
      <div className="mb-5 space-y-4">
        <h2 className="text-3xl font-bold tracking-normal">Saving goals</h2>

        <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-3">
          <div className="form-control">
            <label htmlFor={filterButtonId} className="label">
              <span className="label-text font-medium">Filters</span>
            </label>
            <button
              id={filterButtonId}
              type="button"
              className="btn btn-outline h-12"
              onClick={() => setIsFiltersOpen((prev) => !prev)}
              aria-expanded={isFiltersOpen}
              aria-controls={filterPanelId}
            >
              {isFiltersOpen ? "Hide filters" : "Show filters"}
            </button>
          </div>

          <div className="form-control">
            <label htmlFor={sortById} className="label">
              <span className="label-text font-medium">Sort by</span>
            </label>
            <select
              id={sortById}
              className="select select-bordered h-12 w-full font-semibold"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor={sortDirectionId} className="label">
              <span className="label-text font-medium">Order</span>
            </label>
            <select
              id={sortDirectionId}
              className="select select-bordered h-12 w-full font-semibold"
              value={sortDirection}
              onChange={(e) => onSortDirectionChange(e.target.value)}
            >
              {sortDirectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isFiltersOpen && (
          <div
            id={filterPanelId}
            className="rounded-box border border-base-300 bg-base-100 p-4"
          >
            <div className="space-y-3">
              <div className="form-control">
                <label htmlFor={nameFilterId} className="label">
                  <span className="label-text font-medium">Search by name</span>
                </label>
                <input
                  id={nameFilterId}
                  type="text"
                  className="input input-bordered w-full"
                  value={filters.name}
                  onChange={(e) => onFilterChange("name", e.target.value)}
                />
              </div>

              <div className="form-control">
                <label htmlFor={statusFilterId} className="label">
                  <span className="label-text font-medium">Status</span>
                </label>
                <select
                  id={statusFilterId}
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
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="form-control">
                  <label htmlFor={dateFromId} className="label">
                    <span className="label-text font-medium">Target date from</span>
                  </label>
                  <input
                    id={dateFromId}
                    type="date"
                    className="input input-bordered w-full"
                    value={filters.targetDateFrom}
                    onChange={(e) => onFilterChange("targetDateFrom", e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label htmlFor={dateToId} className="label">
                    <span className="label-text font-medium">Target date to</span>
                  </label>
                  <input
                    id={dateToId}
                    type="date"
                    className="input input-bordered w-full"
                    value={filters.targetDateTo}
                    onChange={(e) => onFilterChange("targetDateTo", e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  className="btn btn-ghost w-full"
                  onClick={onClearFilters}
                >
                  Clear filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div role="status" aria-live="polite" className="py-8 text-center text-base-content">
          Loading goals...
        </div>
      ) : goals.length === 0 ? (
        <div
          className="rounded-box border border-base-300 bg-base-100 p-6 text-base-content"
          role="status"
          aria-live="polite"
        >
          No saving goals found.
        </div>
      ) : (
        <ul className="space-y-4" role="list" aria-label="Saving goals list">
          {goals.map((goal, index) => (
            <li key={goal.id}>
              <GoalCard
                goal={goal}
                isPrimary={index === 0}
                onClick={() => navigate(`/details/${goal.id}`)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default GoalsList;
