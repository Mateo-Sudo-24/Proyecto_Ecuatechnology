import { useState } from 'react';
import { Link } from 'react-scroll';
import { Home, Wrench, Users, Phone, Mail, Clock, Contact, LogIn, UserPlus } from 'lucide-react';
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
      <section className="bg-[#333333] text-white px-8 py-2 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>0962590039</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>contacto@ecuatecnology.com</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>15+ años de experiencia</span>
        </div>
      </section>

      {/* Menú principal */}
      <section className="bg-background px-6 py-4 flex justify-between items-center shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/images/logo.jpg" alt="Logo" className="h-12 w-auto object-contain" />
        </div>

        {/* Navegación */}
        <ul className="flex items-center gap-10 list-none m-0 p-0">
          {/* Scroll interno */}
          <li>
            <Link
              to="home"
              smooth={true}
              duration={500}
              offset={-100}
              className="flex items-center gap-1 text-neutral hover:text-secondary cursor-pointer"
            >
              <Home size={16} />
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="servicios"
              smooth={true}
              duration={500}
              offset={-100}
              className="flex items-center gap-1 text-neutral hover:text-secondary cursor-pointer"
            >
              <Wrench size={16} />
              Servicios
            </Link>
          </li>
          <li>
            <Link
              to="nosotros"
              smooth={true}
              duration={500}
              offset={-100}
              className="flex items-center gap-1 text-neutral hover:text-secondary cursor-pointer"
            >
              <Users size={16} />
              Nosotros
            </Link>
          </li>

          {/* Botón Contacto */}
          <li>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="flex items-center gap-1 text-neutral hover:text-secondary cursor-pointer"
            >
              <Contact size={16} />
              Contacto
            </button>
          </li>

          {/* Botones Login / Registro */}
          <li>
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center justify-center gap-2 bg-[#B8860B] text-black px-4 py-2 rounded-lg transition-all hover:bg-[#8B6914] font-medium"
              data-login-button
            >
              <LogIn size={16} />
              Iniciar Sesión
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setIsRegistroOpen(true)}
              className="flex items-center justify-center gap-2 bg-[#B8860B] text-black px-4 py-2 rounded-lg transition-all hover:bg-[#8B6914] font-medium"
              data-registro-button
            >
              <UserPlus size={16} />
              Registro
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
