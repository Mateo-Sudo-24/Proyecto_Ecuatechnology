// src/components/auth/PrivateRoute.jsx
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../context/storeAuth";

const PrivateRoute = ({ allowedRoles }) => {
  const { token, role, initializeUser } = useAuthStore();

  // Inicializar store desde localStorage si está vacío
  useEffect(() => {
    if (!token) {
      initializeUser();
    }
  }, [token, initializeUser]);

  if (!token || !role) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;

