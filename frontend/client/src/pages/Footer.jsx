import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white py-8 px-4 md:px-8 lg:px-16 mt-0 w-full border-t-2 border-primary relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 px-4">
        {/* Columna 1: Ecuatecnology S.A. */}
        <div className="min-w-0">
          <h3 className="text-xl font-bold mb-4">
            Ecuatecnology S.A.
          </h3>
          <p className="text-base mb-4">
            Más de 15 años brindando soluciones tecnológicas confiables y profesionales para empresas y usuarios finales en Ecuador.
          </p>
          <div className="flex gap-4 md:gap-6">
            <a href="https://facebook.com/ecuatecnology" target="_blank" rel="noopener noreferrer" className="text-white no-underline hover:text-primary">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com/ecuatecnology" target="_blank" rel="noopener noreferrer" className="text-white no-underline hover:text-primary">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com/company/ecuatecnology" target="_blank" rel="noopener noreferrer" className="text-white no-underline hover:text-primary">
              <Linkedin size={24} />
            </a>
            <a href="https://wa.me/593962590039" target="_blank" rel="noopener noreferrer" className="text-green-500 no-underline hover:opacity-80">
              <MessageCircle size={24} />
            </a>
          </div>
        </div>

        {/* Columna 2: Servicios */}
        <div className="min-w-0">
          <h3 className="text-xl font-bold mb-4">
            Servicios
          </h3>
          <ul className="text-base list-none p-0">
            <li>Mantenimiento Preventivo</li>
            <li>Reparación de Hardware</li>
            <li>Soporte de Impresoras</li>
            <li>Soporte Técnico 24/7</li>
            <li>Venta de Repuestos</li>
            <li>Contratos Empresariales</li>
          </ul>
        </div>

        {/* Columna 3: Enlaces Rápidos */}
        <div className="min-w-0">
          <h3 className="text-xl font-bold mb-4">
            Enlaces Rápidos
          </h3>
          <ul className="text-base list-none p-0">
            <li><a href="#" className="text-white no-underline hover:text-primary">Inicio</a></li>
            <li><a href="#" className="text-white no-underline hover:text-primary">Servicios</a></li>
            <li><a href="#" className="text-white no-underline hover:text-primary">Nosotros</a></li>
            <li><a href="#" className="text-white no-underline hover:text-primary">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div className="min-w-0">
          <h3 className="text-xl font-bold mb-4">
            Contacto
          </h3>
          <ul className="text-base list-none p-0">
            <li className="flex items-center gap-2">
              <MapPin size={20} />
              <span className="text-sm md:text-base">Tomás de Berlanga y Lara Mariquez, Ecuador</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={20} />
              <span className="text-sm md:text-base">098 143 2601 - 0962590039</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={20} />
              <span className="text-sm md:text-base">contacto@ecuatecnology.com</span>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-neutral-600" />

      <p className="text-center text-base">
        © 2025 Ecuatecnology S.A. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;