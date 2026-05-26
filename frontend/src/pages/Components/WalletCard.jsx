import { useState } from "react";

function WalletCard({ wallet, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(wallet?.totalBalance || 0);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    await onUpdate(Number(newBalance));

    setLoading(false);
    setEditing(false);
  };

  return (
    <div className="card bg-base-100 shadow-xl w-full max-w-md">
      <div className="card-body">
        <h2 className="card-title">Wallet balance</h2>

        {!editing ? (
          <>
            <p className="text-3xl font-bold">
              {wallet?.totalBalance ?? 0} €
            </p>

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
              className="input input-bordered w-full"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
            />

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
                onClick={() => setEditing(false)}
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