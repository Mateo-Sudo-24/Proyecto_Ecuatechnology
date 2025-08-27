import React, { useState } from 'react';
import { Home, Settings, Users, Contact, LogIn, UserPlus } from 'lucide-react';
import ContactButton from './ContactoButton.jsx';
import ContactModal from './ContactoModal.jsx';
import LoginButton from './LoginButton.jsx';
import RegistroButton from './RegistroButton.jsx';
import LoginModal from './LoginModal.jsx';
import RegistroModal from './RegistroModal.jsx';

const Header = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistroOpen, setIsRegistroOpen] = useState(false);

  return (
    <header style={{ 
      position: 'fixed', 
      top: 40, 
      left: 0, 
      right: 0, 
      zIndex: 50, 
      backgroundColor: 'var(--background)', 
      padding: '1rem 1.5rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
    }}>
      {/* Logo */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        marginLeft: '2rem'
      }}>
        <img 
          src="/images/logo.jpg" 
          alt="Ecuatecnology Logo" 
          style={{ 
            height: '3rem', 
            width: 'auto',
            objectFit: 'contain'
          }} 
        />
      </div>

      {/* Menú de la página en desktop */}
      <ul style={{ 
        display: 'flex', 
        listStyle: 'none', 
        gap: '1.5rem', 
        margin: 0, 
        padding: 0 
      }}>
        <li>
          <a href="#" style={{ color: 'var(--neutral)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hover:text-secondary">
            <Home size={16} />
            Inicio
          </a>
        </li>
        <li>
          <a href="#" style={{ color: 'var(--neutral)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hover:text-secondary">
            <Settings size={16} />
            Servicios
          </a>
        </li>
        <li>
          <a href="#" style={{ color: 'var(--neutral)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hover:text-secondary">
            <Users size={16} />
            Nosotros
          </a>
        </li>
        <li>
          <ContactButton onClick={() => setIsContactOpen(true)} />
        </li>
      </ul>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegistroModal isOpen={isRegistroOpen} onClose={() => setIsRegistroOpen(false)} />

      {/* Botones para el cliente */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <LoginButton onClick={() => setIsLoginOpen(true)} />
        <RegistroButton onClick={() => setIsRegistroOpen(true)} />
      </div>
      
      

    </header>
  );
};

export default Header;