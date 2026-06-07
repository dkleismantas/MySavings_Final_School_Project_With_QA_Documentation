import { Route, Routes } from "react-router";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import CreateGoalPage from "./pages/CreateGoalPage/CreateGoalForm";
import EditGoalPage from "./pages/EditGoalPage/EditGoalPage";
import AuthProvider from "./context/AuthProvider";
import DetailsPage from "./pages/Details/DetailsPage";

function App() {
  return (
    <div>
      {
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="create-goal" element={<CreateGoalPage />} />
            <Route path="details/:id" element={<DetailsPage />} />
            <Route path="edit-goal/:id" element={<EditGoalPage />} />
          </Routes>
        </AuthProvider>
      }
    </div>
  );
}

export default App;
