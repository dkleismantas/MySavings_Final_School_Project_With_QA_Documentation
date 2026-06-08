function DepositHistoryItem({ deposit }) {
  const date = new Date(deposit.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-4 py-3">
      <div className="bg-base-300 rounded-full p-2 shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-base-content/70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{deposit.note || "Deposit"}</p>
        <p className="text-sm text-base-content/60">{date}</p>
      </div>

      <span className="text-success font-semibold shrink-0">
        +€{deposit.amount.toFixed(2)}
      </span>
    </div>
  );
}

export default DepositHistoryItem;