import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      return { token, role };
    }
    return null;
  });

  const login = (token, roleFromBackend) => {
    if (!token || !roleFromBackend) return;

    // Remove ROLE_ prefix
    const cleanRole = roleFromBackend.replace("ROLE_", "");

    localStorage.setItem("token", token);
    localStorage.setItem("role", cleanRole);

    setAuth({ token, role: cleanRole });
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        token: auth?.token || null,
        role: auth?.role || null,
        isAuthenticated: !!auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
