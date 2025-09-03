import React, { useState } from 'react';
import { LogIn } from 'lucide-react';




const LoginButton = ({ onClick }) => {
  return (
    <button type='button'
      style={{
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
        outline: 'none',
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
      className="hover:bg-primary/90 focus:outline-none"
      onClick={onClick}
    >
      <LogIn size={16} />
      Iniciar Sesión
    </button>
  );
};

export default LoginButton;