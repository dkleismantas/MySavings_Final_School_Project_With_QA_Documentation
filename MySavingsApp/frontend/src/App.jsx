import { Route, Routes } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Components/HomePage";
import AuthProvider from "./context/AuthProvider";
import DetailsPage from "./pages/Details/DetailsPage";


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/details/:id" element={
          <ProtectedRoute>
            <DetailsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
