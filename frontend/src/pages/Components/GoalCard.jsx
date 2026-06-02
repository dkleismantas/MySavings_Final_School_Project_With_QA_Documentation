export default function GoalCard({ goal }) {
  const progress = Math.min(
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
    100
  );

  const deadline = new Date(goal.targetDate).toLocaleDateString("lt-LT");

  return (
    <div className="bg-[#1e2330] rounded-2xl p-5 border border-gray-800 shadow-lg text-left">
      
      <h3 className="text-lg font-bold text-white mb-1">{goal.title}</h3>
      <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
        <span>Target: {goal.targetAmount} €</span>
        <span className="text-orange-500 font-semibold">{progress}%</span>
      </div>
      <div className="w-full mb-3">
        <progress 
          className="progress progress-warning w-full h-3 bg-gray-700" 
          value={progress} 
          max="100"
        ></progress>
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <div>
          Saved: <span className="text-white font-medium">{goal.currentAmount} €</span>
        </div>
        <div>
          Due: <span className="text-white font-medium">{deadline}</span>
        </div>
      </div>
    </div>
  );
}