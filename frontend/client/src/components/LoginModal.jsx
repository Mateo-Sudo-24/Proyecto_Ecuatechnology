import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import '../styles/LoginModal.css';
import { useNavigate } from 'react-router-dom'; // <--- CAMBIO 1: Importa useNavigate

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const navigate = useNavigate(); // <--- CAMBIO 2: Llama al hook useNavigate

  const [formData, setFormData] = useState({
    userType: 'clientes',
    email: '',
    password: '',
  });

  const clearForm = () => {
    setFormData({
      userType: 'clientes',
      email: '',
      password: '',
    });
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      clearForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const adminCredentials = {
      email: 'admin@ecua.com',
      password: 'admin123'
    };
    
    if (formData.userType === 'administrativo') {
      if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
        onLogin('administrativo');
        clearForm();
        onClose();
        // Redireccionar al módulo de administrador
        navigate('/admin'); 
      } else {
        alert('Credenciales incorrectas para administrador.\nEmail: admin@ecua.com\nContraseña: admin123');
      }
    } else { // Caso para clientes
      if (formData.email && formData.password) {
        onLogin('clientes');
        clearForm();
        onClose();
        alert('¡Login exitoso como Cliente!');
        // <--- CAMBIO 3: Usa la función navigate() para redirigir
        navigate('/cliente');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <button 
          className="login-modal-close" 
          onClick={handleClose}
          style={{ outline: 'none' }}
        >
          ×
        </button>
        <h2 className="login-modal-title">Iniciar Sesión</h2>

        <div className="grid lg:grid-cols-1 gap-6">
          <div className="login-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="userType" className="block text-sm font-medium mb-2 text-gray-700">
                  Tipo de Usuario *
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  className="login-form-select"
                >
                  <option value="clientes">Cliente</option>
                  <option value="administrativo">Administrativo</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                  Correo Electrónico *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="login-form-input"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700">
                  Contraseña *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="login-form-input"
                />
              </div>

              <button type="submit" className="login-form-submit">
                <LogIn size={18} />
                Iniciar Sesión
              </button>
            </form>
            <div className="login-modal-links">
              <a href="#" className="text-yellow-600 hover:underline">¿Olvidaste tu contraseña?</a>
              <br />
              <a href="#" className="text-yellow-600 hover:underline">¿No tienes cuenta? Regístrate aquí</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;