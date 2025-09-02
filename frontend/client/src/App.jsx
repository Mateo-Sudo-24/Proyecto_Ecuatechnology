import React, { useState } from "react";
import "./index.css";
import ContactBar from "./components/ContactoBar";
import Header from "./components/Header";
import Home from './components/Home';
import ServicesSection from './components/Servicios';
import AboutSection from './components/Nosotros';
import Footer from "./components/Footer";
import AdminModule from "./components/admin/AdminModule";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  const handleLogin = (type) => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
  };

  // Si está autenticado como administrador, mostrar AdminModule
  if (isAuthenticated && userType === 'administrativo') {
    return <AdminModule onLogout={handleLogout} />;
  }

  // Si no está autenticado o es cliente, mostrar la página principal
  return (
    <>
      <div>
        <ContactBar />
        <Header onLogin={handleLogin} />
        <Home />
        <ServicesSection />
        <AboutSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
