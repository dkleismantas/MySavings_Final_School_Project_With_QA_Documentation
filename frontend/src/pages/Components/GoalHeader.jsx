function GoalHeader({ goal }) {
  const dueDate = new Date(goal.targetDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

//   const createdDate = new Date(goal.createdAt).toLocaleDateString("en-GB", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

  return (
    <div>
      <h1 className="text-3xl font-bold">{goal.title}</h1>
      <div className="flex items-center gap-2 mt-1 text-sm text-base-content/60">
        <span>Due {dueDate}</span>
        {/* <span>•</span> */}
        {/* <span>Created {createdDate}</span> */}
      </div>
    </div>
  );
}

export default GoalHeader;