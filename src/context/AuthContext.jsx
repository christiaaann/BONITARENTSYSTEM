import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // fetch user (AUTO via cookie)
  useEffect(() => {
    fetch("http://localhost:3000/api/me", {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  // logout
  const logout = async () => {
    setUser(null);
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);