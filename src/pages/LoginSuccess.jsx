import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshUser()
      .then(data => {
        setTimeout(() => {
          setLoading(false);

          if (data?.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1000);
      })
      .catch(() => {
        setLoading(false);
        navigate("/");
      });
  }, [navigate, refreshUser]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-serif text-amber-900">BONITA</h1>
          <div className="w-12 h-12 border-4 border-gray-300 border-t-amber-900 rounded-full animate-spin"></div>
          <p className="text-amber-900 font-serif">Logging you in...</p>
        </div>
      ) : (
        "Redirecting..."
      )}
    </div>
  );
};

export default LoginSuccess;
