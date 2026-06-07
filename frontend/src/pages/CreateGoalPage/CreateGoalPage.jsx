import CreateGoalForm from "./CreateGoalForm";
import NavBar from "../Components/NavBar";
import { useAuth } from "../../hooks/useAuth";

function CreateGoalPage() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <NavBar />
      {isAuthenticated && <CreateGoalForm />}
    </>
  );
}

export default CreateGoalPage;
