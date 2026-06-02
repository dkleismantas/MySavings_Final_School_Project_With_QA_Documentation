import CreateGoalForm from "./CreateGoalForm";
import { useAuth } from "../../hooks/useAuth";

function CreateGoalPage() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <CreateGoalForm />}
    </>
  );
}

export default CreateGoalPage;
