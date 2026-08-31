import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. I-import ang useAuth

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // 2. Kunin ang setUser mula sa AuthContext
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
      credentials: "include", 
    })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => {
   
        setUser(data);

        setTimeout(() => {
          setLoading(false);

          if (data?.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 500);
      })
      .catch((err) => {
        console.error("LoginSuccess error:", err);
        setLoading(false);
        setUser(null);
        navigate("/", { replace: true });
      });
  }, [navigate, setUser]);

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