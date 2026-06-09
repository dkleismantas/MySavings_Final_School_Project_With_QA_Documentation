const SummaryMain = ({ totalSavings, activeCount, completedCount }) => {
  return (
    <section
      className="rounded-box border border-base-300 bg-base-100 shadow"
      aria-labelledby="summary-heading"
    >
      <h2 id="summary-heading" className="sr-only">
        Savings summary
      </h2>
      <div className="stats stats-vertical w-full sm:stats-horizontal">
        <div className="stat">
          <div className="stat-title text-base-content">Total savings</div>
          <div className="stat-value text-base-content">€{totalSavings}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-base-content">Active goals</div>
          <div className="stat-value text-base-content">{activeCount}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-base-content">Completed goals</div>
          <div className="stat-value text-base-content">{completedCount}</div>
        </div>
      </div>
    </section>
  );
};

export default SummaryMain;
