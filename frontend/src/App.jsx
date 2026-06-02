import { Route, Routes } from "react-router";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import CreateGoalPage from "./pages/CreateGoalPage/CreateGoalForm";
import AuthProvider from "./context/AuthProvider";


function App() {
  return (
    <div>
      {
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="create-goal" element={<CreateGoalPage />} />
          </Routes>
        </AuthProvider>
      }
    </div>
  );
}

export default App;
