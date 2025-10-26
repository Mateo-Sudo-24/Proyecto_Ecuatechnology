import { useState } from 'react';
import { Link } from 'react-scroll';
import { Home, Wrench, Users, Phone, Mail, Clock, LogIn, UserPlus, MapIcon } from 'lucide-react';
import LoginModal from './LoginModal.jsx';
import RegistroModal from './RegistroModal.jsx';
import ContactoModal from './ContactoModal.jsx';

const Header = () => {
  // Estados para abrir/cerrar los modales
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistroOpen, setIsRegistroOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <header className="z-50 font-sans">
      {/* Barra de información superior */}
      <section className="bg-[#333333] text-white px-4 py-2 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span className="text-sm md:text-base">0962590039</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span className="text-sm md:text-base">contacto@ecuatecnology.com</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span className="text-sm md:text-base">15+ años de experiencia</span>
        </div>
      </section>

      {/* Menú principal */}
      <section className="bg-background px-4 py-4 md:px-6 flex flex-col md:flex-row justify-between items-center shadow-md gap-4 md:gap-0">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/images/logo.jpg" alt="Logo" className="h-10 md:h-12 w-auto object-contain" />
        </div>

        {/* Navegación */}
        <ul className="flex flex-col sm:flex-row items-center gap-4 md:gap-10 list-none m-0 p-0">
          {/* Scroll interno */}
          <li>
            <Link
              to="home"
              smooth={true}
              duration={500}
              offset={-100}
              className="flex items-center gap-1 text-neutral hover:text-secondary cursor-pointer text-sm md:text-base"
            >
              <Home size={16} />
              <span className="hidden sm:inline">Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              to="servicios"
              smooth={true}
              duration={500}
              offset={-100}
              className="flex items-center gap-1 text-neutral hover:text-secondary cursor-pointer text-sm md:text-base"
            >
              <Wrench size={16} />
              <span className="hidden sm:inline">Servicios</span>
            </Link>
          </li>
          <li>
            <Link
              to="nosotros"
              smooth={true}
              duration={500}
              offset={-100}
              className="flex items-center gap-1 text-neutral hover:text-secondary cursor-pointer text-sm md:text-base"
            >
              <Users size={16} />
              <span className="hidden sm:inline">Nosotros</span>
            </Link>
          </li>

          {/* Botón Contacto */}
          <li>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="flex items-center gap-1 text-neutral hover:text-secondary cursor-pointer text-sm md:text-base"
            >
              <MapIcon size={16} />
              <span className="hidden sm:inline">Ubicanos</span>
            </button>
          </li>

          {/* Botones Login / Registro */}
          <li>
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center justify-center gap-2 bg-[#B8860B] text-black px-3 py-2 md:px-4 rounded-lg transition-all hover:bg-[#8B6914] font-medium text-sm md:text-base"
              data-login-button
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">Iniciar Sesión</span>
              <span className="sm:hidden">Login</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setIsRegistroOpen(true)}
              className="flex items-center justify-center gap-2 bg-[#B8860B] text-black px-3 py-2 md:px-4 rounded-lg transition-all hover:bg-[#8B6914] font-medium text-sm md:text-base"
              data-registro-button
            >
              <UserPlus size={16} />
              <span className="hidden sm:inline">Registro</span>
              <span className="sm:hidden">Reg</span>
            </button>
          </li>
        </ul>

        {/* Modales */}
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        <RegistroModal isOpen={isRegistroOpen} onClose={() => setIsRegistroOpen(false)} />
        <ContactoModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </section>
    </header>
  );
};

export default Header;
