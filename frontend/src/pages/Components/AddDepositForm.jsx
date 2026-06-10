import { useState } from "react";

function AddDepositForm({ onSubmit, saving, goal, walletBalance }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const parsed = Number(amount);

    if (!amount || parsed <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    // ✅ prevent depositing more than wallet balance
    if (parsed > walletBalance) {
      setError(`Insufficient wallet balance. Available: €${walletBalance.toFixed(2)}`);
      return;
    }

    // ✅ prevent depositing more than remaining goal amount
    const remaining = goal.targetAmount - goal.currentAmount;
    if (parsed > remaining) {
      setError(`Amount exceeds remaining goal amount. Remaining: €${remaining.toFixed(2)}`);
      return;
    }

    await onSubmit({ amount: parsed, note });
    setAmount("");
    setNote("");
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Add Deposit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-white mb-2">Amount</label>
            <input
              type="number"
              className={`input input-bordered w-full ${error ? "input-error" : ""}`}
              placeholder="€ 0.00"
              value={amount}
              min="0.01"
              step="0.01"
              // ✅ block e, E, +, - keys — these are valid in number inputs but meaningless here
              onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              required
            />
            {error && <p className="text-error text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label className="label text-white mb-2">Note (optional)</label>
            <textarea
              placeholder="e.g. Monthly savings"
              className="textarea textarea-bordered w-full"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={saving}
          >
            {saving ? "Saving..." : "Add funds"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDepositForm;