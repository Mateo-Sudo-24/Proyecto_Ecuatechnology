// src/App.jsx

import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactBar from "./components/ContactoBar";
import Header from "./components/Header";
import Home from "./components/Home";
import ServicesSection from "./components/Servicios";
import AboutSection from "./components/Nosotros";
import Footer from "./components/Footer";
// Corrige la importación para usar el nombre del archivo 'Clientes.jsx'
import DashboardClientes from "./components/client/DashboardClientes"; 

const LandingPage = () => {
  return (
    <>
      <ContactBar />
      <Header />
      <div id="home">
        <Home />
      </div>
      <div id="servicios">
        <ServicesSection />
      </div>
      <div id="nosotros">
        <AboutSection />
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cliente/*" element={<DashboardClientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
