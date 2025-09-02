import React, { useState } from 'react';
import { 
  User, 
  BarChart3, 
  Users, 
  Ticket, 
  Clock, 
  Settings, 
  LogOut,
  Shield,
  UserCheck
} from 'lucide-react';
import '../../styles/AdminModule.css';
import AdminManagement from './AdminManagement';

const AdminModule = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showAdminManagement, setShowAdminManagement] = useState(false);

  const navigationItems = [
    { id: 'profile', label: 'Perfil De Administrador', icon: User },
    { id: 'stats', label: 'Estadísticas Generales', icon: BarChart3 },
    { id: 'clients', label: 'Gestión de Clientes', icon: Users },
    { id: 'tickets', label: 'Tickets de Soporte', icon: Ticket },
    { id: 'history', label: 'Historial de Cambios', icon: Clock },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        // Se debe mostrar la ventana de gestión de administradores
        if (showAdminManagement) {
          return (
            <div className="admin-content-section">
              <AdminManagement 
                onBack={() => setShowAdminManagement(false)} 
              />
            </div>
          );
        }
        
        return (
          <div className="admin-content-section">
            <div className="admin-content-header">
              <h1 className="admin-content-title">Mi Perfil</h1>
              <button 
                className="admin-manage-button"
                onClick={() => setShowAdminManagement(true)}
              >
                <UserCheck size={16} />
                Gestionar Administradores
              </button>
            </div>
            
            <div className="admin-profile-container">
              <div className="admin-form-section">
                <h2 className="admin-form-title">Información Personal</h2>
                <div className="admin-form-grid">
                  <div className="admin-form-field">
                    <label className="admin-form-label">Nombre Completo</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      defaultValue="Administrador Principal"
                    />
                  </div>
                  <div className="admin-form-field">
                    <label className="admin-form-label">Email</label>
                    <input 
                      type="email" 
                      className="admin-form-input" 
                      defaultValue="admin@ecuatechnology.com"
                    />
                  </div>
                  <div className="admin-form-field">
                    <label className="admin-form-label">Teléfono</label>
                    <input 
                      type="tel" 
                      className="admin-form-input" 
                      defaultValue="+593 99 123 4567"
                    />
                  </div>
                  <div className="admin-form-field">
                    <label className="admin-form-label">Cargo</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      defaultValue="Administrador del Sistema"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-section">
                <h2 className="admin-form-title">Cambiar Contraseña</h2>
                <div className="admin-form-grid">
                  <div className="admin-form-field">
                    <label className="admin-form-label">Contraseña Actual</label>
                    <input 
                      type="password" 
                      className="admin-form-input" 
                      placeholder="Ingresa tu contraseña actual"
                    />
                  </div>
                  <div className="admin-form-field">
                    <label className="admin-form-label">Nueva Contraseña</label>
                    <input 
                      type="password" 
                      className="admin-form-input" 
                      placeholder="Ingresa tu nueva contraseña"
                    />
                  </div>
                  <div className="admin-form-field">
                    <label className="admin-form-label">Confirmar Nueva Contraseña</label>
                    <input 
                      type="password" 
                      className="admin-form-input" 
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-actions">
                <button className="admin-save-button">Guardar Cambios</button>
                <button className="admin-cancel-button">Cancelar</button>
              </div>
            </div>
          </div>
        );
      case 'stats':
        return <div className="admin-content-section"><h1>Estadísticas Generales</h1></div>;
      case 'clients':
        return <div className="admin-content-section"><h1>Gestión de Clientes</h1></div>;
      case 'tickets':
        return <div className="admin-content-section"><h1>Tickets de Soporte</h1></div>;
      case 'history':
        return <div className="admin-content-section"><h1>Historial de Cambios</h1></div>;
      case 'settings':
        return <div className="admin-content-section"><h1>Configuración</h1></div>;
      default:
        return <div className="admin-content-section"><h1>Mi Perfil</h1></div>;
    }
  };

  return (
    <div className="admin-module">
      {/* Encabezado */}
      <header className="admin-header">
        <div className="admin-header-left">
          <div className="admin-logo">
            <Shield size={24} />
            <div className="admin-logo-text">
              <span className="admin-logo-title">Ecuatecnology</span>
              <span className="admin-logo-subtitle">Panel de Administración</span>
            </div>
          </div>
        </div>
        <div className="admin-header-right">
          <span className="admin-user-info">Administrador</span>
          <User size={20} />
        </div>
      </header>

      <div className="admin-layout">
        {/* Barra Lateral */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`admin-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="admin-sidebar-footer">
            <button className="admin-logout-button" onClick={onLogout}>
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="admin-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminModule;