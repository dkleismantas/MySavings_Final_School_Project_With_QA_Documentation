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
  const filterButtonId = useId();
  const filterPanelId = useId();
  const sortById = useId();
  const sortDirectionId = useId();
  const nameFilterId = useId();
  const statusFilterId = useId();
  const targetDateFromId = useId();
  const targetDateToId = useId();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(filters);

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
              <input
                id={nameFilterId}
                type="text"
                className="input input-bordered w-full"
                placeholder="Search by name"
                value={draftFilters.name}
                onChange={(e) =>
                  setDraftFilters((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />

              <select
                id={statusFilterId}
                className="select select-bordered w-full"
                value={draftFilters.status}
                onChange={(e) =>
                  setDraftFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <option value="">All goals</option>
                <option value="0">In progress</option>
                <option value="1">Completed</option>
              </select>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  id={targetDateFromId}
                  type="date"
                  className="input input-bordered w-full"
                  value={draftFilters.targetDateFrom}
                  onChange={(e) =>
                    setDraftFilters((prev) => ({
                      ...prev,
                      targetDateFrom: e.target.value,
                    }))
                  }
                />

                <input
                  id={targetDateToId}
                  type="date"
                  className="input input-bordered w-full"
                  value={draftFilters.targetDateTo}
                  onChange={(e) =>
                    setDraftFilters((prev) => ({
                      ...prev,
                      targetDateTo: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => {
                    onFilterChange("name", draftFilters.name);
                    onFilterChange("status", draftFilters.status);
                    onFilterChange(
                      "targetDateFrom",
                      draftFilters.targetDateFrom,
                    );
                    onFilterChange("targetDateTo", draftFilters.targetDateTo);
                  }}
                >
                  Apply filters
                </button>

                <button
                  type="button"
                  className="btn btn-ghost w-full"
                  onClick={() => {
                    const emptyFilters = {
                      status: "",
                      targetDateFrom: "",
                      targetDateTo: "",
                      name: "",
                    };

                    setDraftFilters(emptyFilters);
                    onClearFilters();
                  }}
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
