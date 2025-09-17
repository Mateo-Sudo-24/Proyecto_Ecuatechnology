// src/components/auth/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../context/storeAuth";

const PrivateRoute = ({ allowedRoles }) => {
  const { token, role, initializeUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicializa la store desde localStorage si está vacía
    initializeUser();
    setLoading(false);
  }, [initializeUser]);

  if (loading) return null; // o spinner mientras carga

  // Validación de acceso
  if (!token || !role) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />; // renderiza las rutas hijas
};

export default PrivateRoute;
