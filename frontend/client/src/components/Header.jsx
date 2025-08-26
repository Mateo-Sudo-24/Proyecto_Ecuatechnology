import React, { useState } from 'react';
import { Home, Settings, Users, Contact, LogIn, UserPlus } from 'lucide-react';
import ContactButton from './ContactoButton.jsx';
import ContactModal from './ContactoModal.jsx';


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
          <ContactButton onClick={() => setIsModalOpen(true)} />
        </li>
      </ul>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Botones para el cliente */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button style={{ 
          border: '2px solid var(--secondary)', 
          color: 'var(--secondary)', 
          padding: '0.5rem 1rem', 
          borderRadius: '0.375rem', 
          backgroundColor: 'transparent', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.3s ease',
          outline: 'none'
        }} 
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#3F51B5';
          e.target.style.color = 'white';
          e.target.style.borderColor = '#3B82F6';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = 'var(--secondary)';
          e.target.style.borderColor = 'var(--secondary)';
        }}
        >
          <LogIn size={16} />
          Iniciar Sesión
        </button>
        <button style={{ 
          backgroundColor: 'var(--primary)', 
          color: 'black', 
          padding: '0.5rem 1rem', 
          borderRadius: '0.375rem', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          outline: 'none'
        }} className="hover:bg-primary/90">
          <UserPlus size={16} />
          Registro
        </button>
      </div>
    </header>
  );
};

export default Header