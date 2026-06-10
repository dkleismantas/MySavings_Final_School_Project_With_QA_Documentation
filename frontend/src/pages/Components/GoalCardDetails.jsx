import GoalHeader from "./GoalHeader";
import GoalProgressCard from "./GoalProgressCard";

function GoalCardDetails({ goal }) {
  return (
    <div className="flex flex-col gap-6">
      <GoalHeader goal={goal} />
      <GoalProgressCard goal={goal} />
    </div>
  );
}

export default GoalCardDetails;