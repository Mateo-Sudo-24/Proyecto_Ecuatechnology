// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./index.css";
import Home from './components/Home';
import Header from "./components/Header";
import ContactBar from "./components/ContactoBar";
import Footer from "./components/Footer";
import ServicesSection from './components/Servicios';
import AboutSection from './components/Nosotros';
import DashboardClientes from "./components/client/DashboardClientes";
import AdminModule from "./components/admin/AdminModule";

// Componente para la página de inicio (LandingPage)
const LandingPage = ({ onLogin }) => {
  console.log('LandingPage component rendered');
  return (
    <>
      <ContactBar />
      <Header onLogin={onLogin} />
      <Home />
      <ServicesSection />
      <AboutSection />
      <Footer />
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  console.log('App component rendered', { isAuthenticated, userType });

  const handleLogin = (type) => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
  };

  // Lógica principal de enrutamiento y autenticación
  return (
    <BrowserRouter>
      <Routes>
        {/*
          Si el usuario es un administrador, la ruta principal lo redirige al módulo de administrador
          Este patrón protege las rutas de admin.
        */}
        {isAuthenticated && userType === 'administrativo' ? (
          <Route path="/*" element={<AdminModule onLogout={handleLogout} />} />
        ) : (
          <>
            {/*
              Si no es administrador, se muestran las rutas públicas y del cliente.
              La página principal tiene un prop 'onLogin' para manejar el inicio de sesión.
            */}
            <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
            <Route path="/cliente/*" element={<DashboardClientes />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;