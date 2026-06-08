import { useState } from "react";

function WalletCard({ wallet, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(wallet?.totalBalance || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="card bg-base-100 shadow-xl w-full max-w-md">
      <div className="card-body">
        <h2 className="card-title">Wallet balance</h2>

        {!editing ? (
          <>
            <p className="text-3xl font-bold">{wallet?.totalBalance ?? 0} €</p>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              type="number"
              className={`input input-bordered w-full ${error ? "input-error" : ""}`}
              value={newBalance}
              onChange={(e) => {
                setNewBalance(e.target.value);
                setError(""); 
              }}
            />

            {/* ✅ Inline error message */}
            {error && <p className="text-error text-sm mt-1">{error}</p>}

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