import { Route, Routes } from "react-router";
import LoginPage from "./pages/Login/LoginPage";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <div>
      {
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      }
    </div>
  );
}

export default App;
