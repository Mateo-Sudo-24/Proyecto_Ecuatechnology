import React from "react";
import { UserPlus } from "lucide-react";

const RegistroButton = ({ onClick }) => {
    return (
         <button 
    
        style={{ 
          backgroundColor: 'var(--primary)', 
          color: 'black', 
          padding: '0.5rem 1rem', 
          borderRadius: '0.375rem', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          outline: 'none'
        }} className="hover:bg-primary/90"
        onClick={onClick}>

          <UserPlus size={16} />
          Registro
        </button>
    );
};

export default RegistroButton;