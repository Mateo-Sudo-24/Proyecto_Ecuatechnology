// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Páginas públicas
import Home from "./pages/Home";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import LoginModal from "./pages/LoginModal";
import RegistroModal from "./pages/RegistroModal";
import ConfirmacionCorreo from "./pages/ConfirmacionCorreo";

// Dashboards privados
import AdminModule from "./layout/admin/AdminModule";
import ClienteModulo from "./layout/client/ClienteModulo";

// Rutas protegidas
import PrivateRoute from "./components/auth/PrivateRoute";

// LandingPage con props para mostrar el login modal
const LandingPage = ({ showLoginModal = false }) => {
  const [isLoginOpen, setIsLoginOpen] = React.useState(showLoginModal);

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);

  return (
    <>
      <Header onLogin={handleLoginOpen} />
      <Home />
      <Footer />
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={handleLoginClose} />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage showLoginModal={true} />} />
        <Route path="/register" element={<RegistroModal isOpen={true} onClose={() => {}} />} />
        <Route path="/confirm/:token" element={<ConfirmacionCorreo />} />

        {/* Dashboard Admin protegido por rol */}
        <Route element={<PrivateRoute allowedRoles={["administrador"]} />}>
          <Route path="/admin/*" element={<AdminModule />} />
        </Route>

        {/* Dashboard Cliente protegido por rol */}
        <Route element={<PrivateRoute allowedRoles={["cliente"]} />}>
          <Route path="/cliente/*" element={<ClienteModulo />} />
        </Route>

        {/* Redirigir rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
