import React from 'react';
import { Contact } from 'lucide-react';

const ContactButton = ({ onClick }) => {
  return (
    <button
      style={{
        color: 'var(--neutral)',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        padding: 0
      }}
      className="hover:text-secondary"
      onClick={onClick}
    >
      <Contact size={16} />
      Contacto
    </button>
  );
};

export default ContactButton