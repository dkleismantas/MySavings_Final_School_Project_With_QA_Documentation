const SummaryMain = ({ totalSavings, activeCount, completedCount }) => {
  return (
    <section className="w-full space-y-4" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="sr-only">Savings summary</h2>
      
      {/* Total Savings - Dynamic Large Hero Gradient Card */}
      <div className="w-full bg-gradient-to-br from-[#FF5722] to-[#d83f0e] rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#FF5722]/5">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Total savings</p>
        <p className="text-4xl font-extrabold tracking-tight mt-2 text-white">
          €{totalSavings?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Grid Sub-metrics block */}
      <div className="grid grid-cols-2 gap-4">
        {/* Active Cards */}
        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Active goals</p>
          <p className="text-3xl font-bold mt-2 text-[#FF5722]">{activeCount}</p>
        </div>

        {/* Completed Cards */}
        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Goals completed</p>
          <p className="text-3xl font-bold mt-2 text-emerald-500">{completedCount}</p>
        </div>
      </div>
    </section>
  );
};

export default SummaryMain;