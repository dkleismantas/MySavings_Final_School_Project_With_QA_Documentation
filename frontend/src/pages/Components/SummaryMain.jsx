
const SummaryMain = ({totalSavings}) => {
  return (
    <div className="stats shadow w-full">
        <div className="stat">
            <div className="stat-title">Total savings</div>
            <div className="stat-value text-primary">€{totalSavings}</div>
        </div>
    </div>
  )
}

export default SummaryMain