import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "../state/AuthState";

interface ProtectedRouteProps {
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ adminOnly }) => {
  const role = useAuthState((state) => state.role);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "admin") {
    return <Navigate to="/agentdashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
