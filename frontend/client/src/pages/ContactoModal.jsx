import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4">
      <div className="bg-peach-light p-4 md:p-8 rounded-2xl w-[95%] max-w-4xl shadow-xl relative font-body max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-primary text-xl md:text-2xl leading-none"
          onClick={handleClose}
        >
          ×
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-center text-primary mb-2">Contáctanos</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Contact Information with Map */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-peach-light p-4 md:p-6 rounded-lg mb-4 shadow-sm border border-neutral-100">
              <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2 text-neutral">
                <MapPin size={18} md:size={20} className="text-primary" />
                Ubicación
              </h3>
              <p className="text-xs md:text-sm text-gray-600">Tomás de Berlanga y Lara Manriquez</p>
              <p className="text-xs md:text-sm text-gray-600">Quito, Ecuador</p>
              <div className="contact-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!118!1m12!1m3!1d3989.7854!2d-78.4862!3d-0.2299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTMnNDcuNiJTIDc4wrAyOScwMC4zIlc!5e0!3m2!1ses!2sec!4v1234567890"
                  width="100%"
                  height="150"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-peach-light p-4 md:p-6 rounded-lg shadow-sm border border-neutral-100">
                <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2 text-neutral">
                  <Phone size={18} md:size={20} className="text-primary" />
                  Teléfonos
                </h3>
                <p className="text-xs md:text-sm text-gray-600">+593 962590039</p>
                <p className="text-xs md:text-sm text-gray-600">+593 98 143 2601</p>
              </div>

              <div className="bg-peach-light p-4 md:p-6 rounded-lg shadow-sm border border-neutral-100">
                <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2 text-neutral">
                  <Mail size={18} md:size={20} className="text-primary" />
                  Email
                </h3>
                <p className="text-xs md:text-sm text-gray-600">contacto@ecuatecnology.com</p>
              </div>
            </div>

            <div className="bg-peach-light p-4 md:p-6 rounded-lg shadow-sm border border-neutral-100">
              <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2 text-neutral">
                <Clock size={18} md:size={20} className="text-primary" />
                Horarios de Atención
              </h3>
              <p className="text-xs md:text-sm text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-xs md:text-sm text-gray-600">Sábados: 9:00 AM - 2:00 PM</p>
              <p className="text-xs md:text-sm text-gray-600">Emergencias: 24/7</p>
            </div>
          </div>

          {/* Contacto Form */}
          <div className="bg-peach-light p-4 md:p-6 rounded-lg shadow-sm border border-neutral-100">
            <h3 className="text-base md:text-lg font-semibold mb-4 text-neutral">Solicitar Información</h3>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-xs md:text-sm font-medium mb-2 text-gray-700">
                    Nombre *
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-lg text-xs md:text-sm bg-white text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-xs md:text-sm font-medium mb-2 text-gray-700">
                    Teléfono *
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-lg text-xs md:text-sm bg-white text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="correo" className="block text-xs md:text-sm font-medium mb-2 text-gray-700">
                  Correo Electrónico *
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  className="w-full p-2 md:p-3 border border-peach-light rounded-md text-xs md:text-sm bg-background text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                />
              </div>

              <div>
                <label htmlFor="empresa" className="block text-xs md:text-sm font-medium mb-2 text-gray-700">
                  Empresa (opcional)
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 border border-peach-light rounded-md text-xs md:text-sm bg-background text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                />
              </div>

              <div>
                <label htmlFor="servicio" className="block text-xs md:text-sm font-medium mb-2 text-gray-700">
                  Servicio Requerido *
                </label>
                <select
                  id="servicio"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                  className="w-full p-2 md:p-3 border border-peach-light rounded-md text-xs md:text-sm bg-background text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3e%3cpath stroke=%22%236B7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M6 8l4 4 4-4%22/%3e%3c/svg%3e')] bg-right-2 bg-no-repeat bg-[length:1.5em_1.5em]"
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
                <label htmlFor="mensaje" className="block text-xs md:text-sm font-medium mb-2 text-gray-700">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  className="w-full p-2 md:p-3 border border-peach-light rounded-md text-xs md:text-sm bg-background text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-vertical min-h-[80px] md:min-h-[100px]"
                  placeholder="Describe tu necesidad o consulta..."
                />
              </div>

              <button type="submit" className="w-full p-2 md:p-3 bg-primary text-black border-none rounded-lg text-xs md:text-sm font-semibold cursor-pointer transition-all hover:bg-primary-dark flex items-center gap-2 justify-center font-medium">
                <Send size={16} md:size={18} />
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