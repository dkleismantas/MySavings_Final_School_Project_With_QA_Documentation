import DepositHistoryItem from "./DepositHistoryItem";

function DepositHistory({ deposits }) {
  return (
    <div className="rounded-3xl border border-zinc-800/80 bg-[#141417] p-6 md:p-8 shadow-xl mt-6">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4 mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight">Deposit history</h2>
        {deposits.length > 0 && (
          <span className="text-xs md:text-sm font-semibold text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800/40">
            {deposits.length} {deposits.length === 1 ? "deposit" : "deposits"}
          </span>
        )}
      </div>

      {deposits.length === 0 ? (
        <div className="text-center py-8 text-zinc-500 font-medium text-base">No deposits made yet.</div>
      ) : (
        <div className="divide-y divide-zinc-800/60" role="list">
          {deposits.map((deposit) => (
            <DepositHistoryItem key={deposit.id} deposit={deposit} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DepositHistory;