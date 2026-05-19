import { Route, Routes } from "react-router";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <div>
      {
        <Routes>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      }
    </div>
  );
}

export default App;
