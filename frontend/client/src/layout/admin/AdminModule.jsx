// src/layout/admin/AdminModule.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import useAuthStore from "../../context/storeAuth";
import '../../styles/admin.css';

// Componentes internos
import AdminManagement from './AdminManagement';
import AdminStats from './AdminStats';
import AdminClients from './AdminClients';
import AdminTickets from './AdminTickets';
import AdminConfiguration from './AdminConfiguration';
import AdminChangeHistory from './AdminChangeHistory';

const AdminModule = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [activeSection, setActiveSection] = useState('profile');

  const handleLogout = () => {
    // 1. Limpiar almacenamiento local
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    // 2. Limpiar estado global si existe
    logout?.();

    // 3. Redirigir al login
    navigate("/login");
  };

  const navigationItems = [
    { id: 'profile', label: 'Información del administrador', icon: UserCheck },
    { id: 'stats', label: 'Estadísticas Generales', icon: BarChart3 },
    { id: 'clients', label: 'Gestión de Clientes', icon: Users },
    { id: 'tickets', label: 'Tickets de Soporte', icon: Ticket },
    { id: 'history', label: 'Historial de Cambios', icon: Clock },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <AdminManagement />;
      case 'stats':
        return <AdminStats />;
      case 'clients':
        return <AdminClients />;
      case 'tickets':
        return <AdminTickets />;
      case 'history':
        return <AdminChangeHistory />;
      case 'settings':
        return <AdminConfiguration />;
      default:
        return <AdminManagement />;
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

      {/* Layout */}
      <div className="admin-layout">
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
            <button className="admin-logout-button" onClick={handleLogout}>
              <LogOut size={20} />
              Cerrar sesión
            </button>
          </div>
        </aside>

        <main className="admin-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminModule;
