import React, { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import AdminProtectedRoute from "../router/AdminProtectedRoute";

import Users from "../admin/Users";
import Dashboard from "../admin/Dashboard";
import Inventory from "../admin/Inventory";
import Trash from "../admin/Trash";
import ActiveRentals from "../admin/ActiveRentals";
import ReturnsAndOverdue from "../admin/ReturnsAndOverdue";
import TransactionsPayments from "../admin/transactionspayments";

const AdminRoutes = () => {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Route element={<AdminProtectedRoute />}>

      <Route path="/admin" element={<AdminLayout />}>

        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

       <Route 
         path="activerentals"
         element={<ActiveRentals />}
       />

       <Route 
        path="returnsandoverdue"
        element={<ReturnsAndOverdue />}
       />

        <Route
          path="users"
          element={<Users setTheme={setTheme} />}
        />

        <Route
          path="inventory"
          element={<Inventory />}
        />
        
        <Route 
         path="payments"
         element={<TransactionsPayments />}
        />

        <Route
          path="trash"
          element={<Trash />}
        />

      </Route>

    </Route>
  );
};

export default AdminRoutes;