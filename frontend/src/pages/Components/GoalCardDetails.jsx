import GoalHeader from "./GoalHeader";
import GoalProgressCard from "./GoalProgressCard";

function GoalCardDetails({ goal }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body gap-6">
        <GoalHeader goal={goal} />
        <GoalProgressCard goal={goal} />
      </div>
    </div>
  );
}

export default GoalCardDetails;