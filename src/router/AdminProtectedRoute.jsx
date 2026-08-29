import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtectedRoute = () => {
  const { user } = useAuth();

  // Hinihintay muna matapos ang /api/me
  if (user === undefined) {
    return null;
  }

  // Hindi naka-login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Naka-login pero hindi admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin
  return <Outlet />;
};

export default AdminProtectedRoute;