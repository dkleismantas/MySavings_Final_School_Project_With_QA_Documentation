import { Route, Routes } from "react-router";
import LoginPage from "./pages/Login/LoginPage";
import GoalsPage from "./pages/Goals/GoalsPage";

function App() {
  return (
    <div>
      {
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="goals" element={<GoalsPage />} />
        </Routes>
      }
    </div>
  );
}

export default App;
