import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/login/admin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;