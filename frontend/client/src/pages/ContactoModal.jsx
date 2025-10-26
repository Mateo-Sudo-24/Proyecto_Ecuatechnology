// Modal de información geográfica de la empresa
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm md:max-w-md p-4 md:p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl md:text-2xl leading-none"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-center text-primary mb-2">Ubicanos</h2>
        <p className="text-center text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Información de nuestras instalaciones y horarios de atención al cliente</p>

        <div className="space-y-4 md:space-y-6">
          {/* Ubicación con Mapa */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin size={18} md:size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm md:text-base text-neutral mb-1">Ubicación</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3">Tomás de Berlanga y Lara Manriquez</p>
              <p className="text-xs md:text-sm text-gray-600 mb-3">Quito, Ecuador</p>
              <div className="w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7854!2d-78.4862!3d-0.2299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTMnNDcuNiJTIDc4wrAyOScwMC4zIlc!5e0!3m2!1ses!2sec!4v1234567890!5m2!1ses!2sec"
                  width="100%"
                  height="150"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail size={18} md:size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base text-neutral mb-1">Email</h3>
              <p className="text-xs md:text-sm text-gray-600">contacto@ecuatecnology.com</p>
            </div>
          </div>

          {/* Horarios */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock size={18} md:size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base text-neutral mb-1">Horarios de Atención</h3>
              <p className="text-xs md:text-sm text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-xs md:text-sm text-gray-600">Sábados: 9:00 AM - 2:00 PM</p>
              <p className="text-xs md:text-sm text-gray-600">Emergencias: 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoModal