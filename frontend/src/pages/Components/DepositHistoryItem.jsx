function DepositHistoryItem({ deposit }) {
  const date = new Date(deposit.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between gap-4 py-4 transition-all hover:bg-zinc-900/20 px-1 rounded-xl">
      <div className="flex items-center gap-4 min-w-0">
        {/* Down Arrow Badge */}
        <div className="bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full p-2.5 shrink-0 hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>

        <div className="min-w-0">
          <p className="font-bold text-zinc-200 text-base md:text-lg truncate">{deposit.note || "Deposit"}</p>
          <p className="text-xs md:text-sm font-medium text-zinc-400 mt-0.5">{date}</p>
        </div>
      </div>

      <span className="text-[#10B981] font-bold text-lg md:text-xl shrink-0 tracking-tight">
        +€{deposit.amount.toFixed(2)}
      </span>
    </div>
  );
}

export default DepositHistoryItem;