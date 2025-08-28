import React from 'react';
import { Contact } from 'lucide-react';

const ContactButton = ({ onClick }) => {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        padding: 0,
        color: 'var(--neutral)',
      }}
      className="hover:text-secondary focus:outline-none"
      onClick={onClick}
    >
      <Contact size={16} />
      Contacto
    </button>
  );
};

export default ContactButton