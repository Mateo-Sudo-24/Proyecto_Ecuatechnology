import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import '../styles/RegistroModal.css';

const RegistroModal = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    password: '',
    confirmPassword: '',
  });

  // Función para limpiar el formulario
  const clearForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      empresa: '',
      password: '',
      confirmPassword: '',
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
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    // Validar que la contraseña tenga al menos 6 caracteres
    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Simular registro exitoso con credenciales quemadas
    // En una aplicación real, aquí harías la validación con el backend
    if (formData.nombre && formData.apellido && formData.email && formData.telefono && formData.password) {
      // Simular que el registro fue exitoso y automáticamente loguear como cliente
      alert('¡Registro exitoso! Has sido logueado automáticamente.');
      onLogin('clientes'); // Loguear como cliente después del registro
      clearForm();
      onClose();
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
    <div className=" registro-modal-overlay">
      <div className="registro-modal-content">
        <button 
          className="registro-modal-close" 
          onClick={handleClose}
          style={{ outline: 'none' }}
        >
          ×
        </button>
        <h2 className="registro-modal-title">Registro</h2>

        <div className="grid lg:grid-cols-1 gap-6">
          
          <div className="registro-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium mb-2 text-gray-700">
                    Nombre *
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="registro-form-input"
                  />
                </div>
                <div>
                  <label htmlFor="apellido" className="block text-sm font-medium mb-2 text-gray-700">
                    Apellido *
                  </label>
                  <input
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    className="registro-form-input"
                  />
                </div>
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
                  className="registro-form-input"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium mb-2 text-gray-700">
                  Teléfono *
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="registro-form-input"
                />
              </div>

              <div>
                <label htmlFor="empresa" className="block text-sm font-medium mb-2 text-gray-700">
                  Empresa (opcional)
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="registro-form-input"
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
                  className="registro-form-input"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-700">
                  Confirmar Contraseña *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="registro-form-input"
                />
              </div>

              <button type="submit" className="registro-form-submit">
                <UserPlus size={18} />
                Crear Cuenta
              </button>
            </form>
            <div className="registro-modal-links">
              <a href="#" className="text-yellow-600 hover:underline">¿Ya tienes cuenta? Inicia sesión aquí</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroModal;