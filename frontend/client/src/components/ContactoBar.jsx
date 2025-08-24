import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

const ContactBar = () => {
  return (
    <div style={{ 
      backgroundColor: 'var(--secondary)', 
      color: 'white', 
      padding: '0.5rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', marginLeft: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Phone size={16} />
          <span>+593 962590039</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Mail size={16} />
          <span>contacto@ecuatecnology.com</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Clock size={16} />
        <span>15+ años de experiencia</span>
      </div>
    </div>
  );
};

export default ContactBar;