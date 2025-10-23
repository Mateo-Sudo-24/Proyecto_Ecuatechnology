import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--neutral)',
      color: 'white',
      padding: '2rem 8rem',
      marginTop: '0rem'
    }}>
      <div style={{
        maxWidth: '91rem',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '3rem',
        padding: '0 1rem',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }
      }}>
        {/* Columna 1: Ecuatecnology S.A. */}
        <div style={{ minWidth: '0' }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Ecuatecnology S.A.
          </h3>
          <p style={{
            fontSize: '1rem',
            marginBottom: '1rem'
          }}>
            Más de 15 años brindando soluciones tecnológicas confiables y profesionales para empresas y usuarios finales en Ecuador.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '2rem' 
          }}>
            <a href="https://facebook.com/ecuatecnology" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }} className="hover:text-primary">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com/ecuatecnology" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }} className="hover:text-primary">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com/company/ecuatecnology" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }} className="hover:text-primary">
              <Linkedin size={24} />
            </a>
            <a href="https://wa.me/593962590039" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none' }} className="hover:opacity-80">
              <MessageCircle size={24} />
            </a>
          </div>
        </div>

        {/* Columna 2: Servicios */}
        <div style={{ minWidth: '0' }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Servicios
          </h3>
          <ul style={{
            fontSize: '1rem',
            listStyle: 'none',
            padding: 0
          }}>
            <li>Mantenimiento Preventivo</li>
            <li>Reparación de Hardware</li>
            <li>Soporte de Impresoras</li>
            <li>Soporte Técnico 24/7</li>
            <li>Venta de Repuestos</li>
            <li>Contratos Empresariales</li>
          </ul>
        </div>

        {/* Columna 3: Enlaces Rápidos */}
        <div style={{ minWidth: '0' }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Enlaces Rápidos
          </h3>
          <ul style={{
            fontSize: '1rem',
            listStyle: 'none',
            padding: 0
          }}>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }} className="hover:text-primary">Inicio</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }} className="hover:text-primary">Servicios</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }} className="hover:text-primary">Nosotros</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }} className="hover:text-primary">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div style={{ minWidth: '0' }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Contacto
          </h3>
          <ul style={{
            fontSize: '1rem',
            listStyle: 'none',
            padding: 0
          }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={20} />
              Tomás de Berlanga y Lara Mariquez, Ecuador
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={20} />
              098 143 2601
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={20} />
              contacto@ecuatecnology.com
            </li>
          </ul>
        </div>
      </div>

      <hr style={{
        margin: '1.5rem 0',
        borderColor: '#4B4B4B'
      }} />

      <p style={{
        textAlign: 'center',
        fontSize: '1rem'
      }}>
        © 2025 Ecuatecnology S.A. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;