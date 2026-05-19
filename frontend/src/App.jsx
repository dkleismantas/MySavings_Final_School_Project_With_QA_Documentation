import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";

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
