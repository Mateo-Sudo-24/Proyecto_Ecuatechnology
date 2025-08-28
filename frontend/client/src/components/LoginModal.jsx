import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import '../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    userType: 'clientes',
    email: '',
    password: '',
  });

  // Función para limpiar el formulario
  const clearForm = () => {
    setFormData({
      userType: 'clientes',
      email: '',
      password: '',
    });
  };

  // Función para manejar el cierre del modal
  const handleClose = () => {
    clearForm();
    onClose();
  };

  // Limpiar formulario cuando el modal se abra
  useEffect(() => {
    if (isOpen) {
      clearForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    clearForm();
    onClose();
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