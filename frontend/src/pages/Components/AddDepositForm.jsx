import { useState } from "react";

function AddDepositForm({ onSubmit, saving }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) return;

    await onSubmit({ amount: Number(amount), note });

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
              className="input input-bordered w-full"
              placeholder="€ 0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
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