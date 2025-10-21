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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Validación de acceso
  if (!token || !role) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />; // renderiza las rutas hijas
};

export default PrivateRoute;
