import DepositHistoryItem from "./DepositHistoryItem";

function DepositHistory({ deposits }) {
  return (
    <div className="card bg-base-100 shadow-xl mt-6">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">Deposit history</h2>
          {deposits.length > 0 && (
            <span className="text-sm text-base-content/60">
              {deposits.length} {deposits.length === 1 ? "deposit" : "deposits"}
            </span>
          )}
        </div>

        {deposits.length === 0 ? (
          <div className="alert mt-2">No deposits yet</div>
        ) : (
          <div className="divide-y divide-base-200">
            {deposits.map((deposit) => (
              <DepositHistoryItem key={deposit.id} deposit={deposit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DepositHistory;