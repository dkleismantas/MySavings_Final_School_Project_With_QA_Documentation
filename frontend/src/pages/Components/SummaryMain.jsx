
const SummaryMain = ({totalSavings, activeCount, completedCount}) => {
  return (
    <div className="stats shadow w-full">
        <div className="stat">
            <div className="stat-title">Total savings</div>
            <div className="stat-value text-primary">€{totalSavings}</div>
        </div>

       <div className="stat">
        <div className="stat-title">Active goals</div>
        <div className="stat-value">
          {activeCount}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Completed goals</div>
        <div className="stat-value text-success">
          {completedCount}
        </div>
      </div>

    </div>
  )
}

export default SummaryMain
