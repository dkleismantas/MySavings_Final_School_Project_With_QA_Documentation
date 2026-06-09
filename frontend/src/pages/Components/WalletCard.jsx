import { useId, useState } from "react";

function WalletCard({ wallet, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(wallet?.totalBalance || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const balanceFieldId = useId();
  const balanceErrorId = `${balanceFieldId}-error`;

  const handleSave = async () => {
    const parsed = Number(newBalance);

    if (isNaN(parsed) || parsed <= 0) {
      setError("Balance must be a number greater than 0.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await onUpdate(parsed);
      setEditing(false);
    } catch (err) {
      const message =
        err?.response?.data?.error ?? "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError("");
    setNewBalance(wallet?.totalBalance || 0); 
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Wallet balance</h2>

        {!editing ? (
          <>
            <p className="text-3xl font-bold">{wallet?.totalBalance ?? 0} €</p>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setNewBalance(wallet?.totalBalance || 0);
                  setError("");
                  setEditing(true);
                }}
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor={balanceFieldId} className="label">
              <span className="label-text font-medium">Balance amount</span>
            </label>
            <input
              id={balanceFieldId}
              type="number"
              inputMode="decimal"
              className={`input input-bordered w-full ${error ? "input-error" : ""}`}
              value={newBalance}
              aria-label="Wallet balance"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? balanceErrorId : undefined}
              onChange={(e) => {
                setNewBalance(e.target.value);
                setError("");
              }}
            />

            {error && (
              <p id={balanceErrorId} className="mt-1 text-sm text-error" role="alert">
                {error}
              </p>
            )}

            <div className="flex gap-2 justify-end mt-4">
              <button
                className="btn btn-success btn-sm"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                className="btn btn-ghost btn-sm"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WalletCard;
