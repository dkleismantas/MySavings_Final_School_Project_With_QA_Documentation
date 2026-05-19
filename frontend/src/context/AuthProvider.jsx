import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

const getClaimsFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      loggedIn: true,
      id: decoded.Id,
      username: decoded.Username,
      email: decoded.Email,
      role: decoded.Role,
    };
  } catch {
    return null;
  }
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return getClaimsFromToken(token);
  });

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setUser(getClaimsFromToken(token));
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
