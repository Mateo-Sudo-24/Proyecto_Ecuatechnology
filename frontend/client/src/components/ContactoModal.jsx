import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import '../styles/ContactoModal.css';

const ContactoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    empresa: "",
    servicio: "",
    mensaje: "",
  });

  // Función para limpiar el formulario
  const clearForm = () => {
    setFormData({
      nombre: "",
      telefono: "",
      correo: "",
      empresa: "",
      servicio: "",
      mensaje: "",
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
    <div className="contact-modal-overlay">
      <div className="contact-modal-content">
        <button 
          className="contact-modal-close" 
          onClick={handleClose}
          style={{ outline: 'none' }}
        >
          ×
        </button>
        <h2 className="contact-modal-title">Contáctanos</h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact Information with Map */}
          <div className="space-y-6">
            <div className="contact-card">
              <h3 className="contact-card-title flex items-center gap-2">
                <MapPin size={20} className="contact-icon" />
                Ubicación
              </h3>
              <p className="contact-card-text">Tomás de Berlanga y Lara Manriquez</p>
              <p className="contact-card-text">Quito, Ecuador</p>
              <div className="contact-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!118!1m12!1m3!1d3989.7854!2d-78.4862!3d-0.2299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTMnNDcuNiJTIDc4wrAyOScwMC4zIlc!5e0!3m2!1ses!2sec!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="contact-card">
                <h3 className="contact-card-title flex items-center gap-2">
                  <Phone size={20} className="contact-icon" />
                  Teléfonos
                </h3>
                <p className="contact-card-text">+593 962590039</p>
                <p className="contact-card-text">+593 98 143 2601</p>
              </div>

              <div className="contact-card">
                <h3 className="contact-card-title flex items-center gap-2">
                  <Mail size={20} className="contact-icon" />
                  Email
                </h3>
                <p className="contact-card-text">contacto@ecuatecnology.com</p>
              </div>
            </div>

            <div className="contact-card">
              <h3 className="contact-card-title flex items-center gap-2">
                <Clock size={20} className="contact-icon" />
                Horarios de Atención
              </h3>
              <p className="contact-card-text">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="contact-card-text">Sábados: 9:00 AM - 2:00 PM</p>
              <p className="contact-card-text">Emergencias: 24/7</p>
            </div>
          </div>

          {/* Contacto Form */}
          <div className="contact-card">
            <h3 className="contact-card-title">Solicitar Información</h3>
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
                    className="contact-form-input"
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
                    className="contact-form-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium mb-2 text-gray-700">
                  Correo Electrónico *
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  className="contact-form-input"
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
                  className="contact-form-input"
                />
              </div>

              <div>
                <label htmlFor="servicio" className="block text-sm font-medium mb-2 text-gray-700">
                  Servicio Requerido *
                </label>
                <select
                  id="servicio"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                  className="contact-form-select"
                >
                  <option value="">Seleccionar servicio</option>
                  <option value="mantenimiento-preventivo">Mantenimiento Preventivo</option>
                  <option value="reparacion-hardware">Reparación de Hardware</option>
                  <option value="soporte-impresoras">Soporte de Impresoras</option>
                  <option value="soporte-tecnico">Soporte Técnico</option>
                  <option value="venta-repuestos">Venta de Repuestos</option>
                  <option value="contrato-empresarial">Contrato Empresarial</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium mb-2 text-gray-700">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  className="contact-form-textarea"
                  placeholder="Describe tu necesidad o consulta..."
                />
              </div>

              <button type="submit" className="contact-form-submit">
                <Send size={18} />
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoModal