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
      const message = err?.response?.data?.error ?? "Something went wrong. Please try again.";
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
    <div className="w-full bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-400 tracking-wide uppercase">Wallet balance</h2>
          {!editing && (
            <button
              className="text-xs font-semibold text-[#FF5722] hover:text-[#e44d1e] bg-[#FF5722]/10 px-3 py-1.5 rounded-lg transition-colors"
              onClick={() => {
                setNewBalance(wallet?.totalBalance || 0);
                setError("");
                setEditing(true);
              }}
            >
              Edit
            </button>
          )}
        </div>

        {!editing ? (
          <div>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white transition-all duration-300">
              €{wallet?.totalBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? "0.00"}
            </p>
          </div>
        ) : (
          <div className="space-y-3 pt-1 animate-fadeIn">
            <input
              id={balanceFieldId}
              type="number"
              inputMode="decimal"
              className="w-full px-4 py-2.5 rounded-xl bg-[#101010] border border-zinc-800 text-white focus:outline-none focus:border-[#FF5722] transition-colors text-sm"
              value={newBalance}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? balanceErrorId : undefined}
              onChange={(e) => {
                setNewBalance(e.target.value);
                setError("");
              }}
            />

            {error && (
              <p id={balanceErrorId} className="text-xs text-[#FF5722]" role="alert">
                {error}
              </p>
            )}

            <div className="flex gap-2 justify-end text-xs">
              <button
                className="px-3 py-1.5 rounded-lg bg-zinc-800 text-gray-400 hover:text-white transition-colors"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 rounded-lg bg-[#FF5722] hover:bg-[#e44d1e] text-white font-medium transition-colors"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletCard;