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

    if (parsed > walletBalance) {
      setError(`Insufficient wallet balance. Available: €${walletBalance.toFixed(2)}`);
      return;
    }

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
    <div className="rounded-3xl border border-zinc-800/80 bg-[#141417] p-6 md:p-8 shadow-xl">
      <h2 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight mb-5">Add deposit</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium text-base">€</span>
            <input
              type="number"
              className={`w-full rounded-2xl border bg-[#1E1E22] py-3.5 pl-9 pr-4 text-zinc-100 placeholder-zinc-600 focus:border-[#FF4E11] focus:outline-none focus:ring-1 focus:ring-[#FF4E11] transition-all text-base ${
                error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-zinc-800/60"
              }`}
              placeholder="0.00"
              value={amount}
              min="0.01"
              step="0.01"
              onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              required
            />
          </div>
          {error && <p className="text-red-400 text-xs font-medium mt-1.5 pl-1">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Note (optional)</label>
          <textarea
            placeholder="e.g. Monthly savings"
            className="w-full h-24 rounded-2xl border border-zinc-800/60 bg-[#1E1E22] p-4 text-zinc-100 placeholder-zinc-600 focus:border-[#FF4E11] focus:outline-none focus:ring-1 focus:ring-[#FF4E11] transition-all resize-none text-base"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#E03400] py-4 font-bold text-white transition-all hover:bg-[#E24009] active:scale-[0.99] disabled:opacity-50 text-base shadow-lg shadow-[#FF4E11]/10 mt-2"
          disabled={saving}
        >
          {saving ? "Saving..." : "Add funds"}
        </button>
      </form>
    </div>
  );
}

export default AddDepositForm;