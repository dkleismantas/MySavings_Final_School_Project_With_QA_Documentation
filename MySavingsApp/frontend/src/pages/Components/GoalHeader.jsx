function GoalHeader({ goal }) {
  const dueDate = new Date(goal.targetDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">{goal.title}</h1>
      <div className="flex items-center gap-2 mt-2 text-sm md:text-base text-zinc-400 font-medium">
        <span>Due {dueDate}</span>
      </div>
    </div>
  );
}

export default GoalHeader;