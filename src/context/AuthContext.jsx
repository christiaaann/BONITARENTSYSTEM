import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  // UI Context
  const [authStep, setAuthStep] = useState("google");
  const [showLogoutConfirm, setLogoutConfirm] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/me`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);

      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Google modal
  const openGoogleModal = () => {
    setShowGoogleModal(true);
  };

  const closeGoogleModal = () => {
    setShowGoogleModal(false);
  };

  // Logout
  const logout = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,

        showLogoutConfirm,
        setLogoutConfirm,

        showGoogleModal,
        openGoogleModal,
        closeGoogleModal,

        authStep,
        setAuthStep,
      }}
    >
      {children}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center">

            <h2 className="text-2xl font-serif mb-4 text-black">
              Logout?
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to Logout?
            </p>

            <div className="flex gap-4 justify-center">

              <button
                onClick={() => setLogoutConfirm(false)}
                className="px-6 py-2 rounded-full border border-gray-300 border-dashed text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={logout}
                className="px-6 cursor-pointer py-2 rounded-full bg-amber-900 text-white"
              >
                Confirm Logout
              </button>

            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);