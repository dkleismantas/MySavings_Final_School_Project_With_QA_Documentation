import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSliders, FiArrowDown, FiArrowUp } from "react-icons/fi";
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
  sortDirection,
  onSortChange,
  onSortDirectionChange,
  loading,
  filters = {},
  onFilterChange,
  onClearFilters,
}) => {
  const navigate = useNavigate();
  const filterPanelId = useId();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(filters);

  const toggleDirection = () => {
    onSortDirectionChange(sortDirection === "desc" ? "asc" : "desc");
  };

  return (
    <section className="w-full space-y-6">
      {/* Header section controlling toolbar functions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-white">Your goals</h2>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Trigger Button */}
          <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              isFiltersOpen 
                ? "bg-zinc-800 border-zinc-700 text-white" 
                : "bg-[#18181b] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
            onClick={() => setIsFiltersOpen((prev) => !prev)}
            aria-expanded={isFiltersOpen}
            aria-controls={filterPanelId}
          >
            <FiSliders className="w-4 h-4" />
            Filters
          </button>

          {/* Sort Selection Box Component */}
          <div className="bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-1 flex items-center gap-2 focus-within:border-zinc-700 transition-colors">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider pl-1">Sort by
            <select
              className="bg-transparent text-sm font-semibold text-zinc-200 focus:outline-none py-1.5 pr-2 cursor-pointer"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#18181b]">
                  {option.label}
                </option>
              ))}
            </select>
            </label>
          </div>

          {/* Direction Order Handler Button Toggle */}
          <button
            type="button"
            className="p-2.5 bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-300 hover:text-white transition-colors"
            onClick={toggleDirection}
            title={sortDirection === "desc" ? "Sort Ascending" : "Sort Descending"}
          >
            {sortDirection === "desc" ? <FiArrowDown className="w-4 h-4" /> : <FiArrowUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Filtering Panel Container */}
      {isFiltersOpen && (
        <div
          id={filterPanelId}
          className="rounded-2xl border border-zinc-800 bg-[#141417] p-5 space-y-4 animate-fadeIn"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Filter Name String Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Search</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1c1c21] border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-700 placeholder-zinc-600"
                placeholder="Search by name..."
                value={draftFilters.name ?? ""}
                onChange={(e) =>
                  setDraftFilters((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            {/* Selector Option Dropdowns Status Variant Types */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Status</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl bg-[#1c1c21] border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-700 cursor-pointer"
                value={draftFilters.status}
                onChange={(e) => setDraftFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="">All goals</option>
                <option value="0">In progress</option>
                <option value="1">Completed</option>
              </select>
            </div>

            {/* Minimum Target Calendar Bounds picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">From Date</label>
              <input
                type="date"
                style={{ colorScheme: "dark" }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1c1c21] border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-700"
                value={draftFilters.targetDateFrom}
                onChange={(e) => setDraftFilters(prev => ({ ...prev, targetDateFrom: e.target.value }))}
              />
            </div>

            {/* Maximum Target Calendar Bounds picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">To Date</label>
              <input
                type="date"
                style={{ colorScheme: "dark" }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1c1c21] border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-700"
                value={draftFilters.targetDateTo}
                onChange={(e) => setDraftFilters(prev => ({ ...prev, targetDateTo: e.target.value }))}
              />
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800/40">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              onClick={() => {
                const emptyFilters = { status: "", targetDateFrom: "", targetDateTo: "", name: "" };
                setDraftFilters(emptyFilters);
                onClearFilters();
              }}
            >
              Clear Filters
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-[#FF4E11] hover:bg-[#E24009] text-white text-sm font-semibold transition-colors"
              onClick={() => {
                onFilterChange("name", draftFilters.name);
                onFilterChange("status", draftFilters.status);
                onFilterChange("targetDateFrom", draftFilters.targetDateFrom);
                onFilterChange("targetDateTo", draftFilters.targetDateTo);
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Grid wrapper for list items */}
      {loading ? (
        <div role="status" aria-live="polite" className="py-12 text-center text-zinc-500 font-medium animate-pulse">
          Loading goals layout metrics...
        </div>
      ) : goals.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-[#141417] p-8 text-center text-zinc-400" role="status" aria-live="polite">
          No saving goals found matching your configuration filters.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Saving goals list">
          {goals.map((goal, index) => (
            <li key={goal.id} className={index === 0 ? "md:col-span-2" : ""}>
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