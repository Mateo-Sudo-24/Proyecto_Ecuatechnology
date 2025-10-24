// src/layout/admin/AdminModule.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Ticket,
  Settings,
  LogOut,
  Shield,
  UserCheck,
  Menu,
  X
} from 'lucide-react';
import useAuthStore from "../../context/storeAuth";

// Componentes internos
import AdminManagement from './AdminManagement';
import AdminTickets from './AdminTickets';
import AdminConfiguration from './AdminConfiguration';

const cn = (...classes) => classes.filter(Boolean).join(" ");

const AdminModule = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [activeSection, setActiveSection] = useState('profile');
  const [isOpen, setIsOpen] = useState(false);

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
    { id: 'tickets', label: 'Tickets de Soporte', icon: Ticket },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <AdminManagement />;
      case 'tickets':
        return <AdminTickets />;
      case 'settings':
        return <AdminConfiguration />;
      default:
        return <AdminManagement />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col overflow-x-hidden">
      {/* Encabezado */}
      <header className="bg-black text-white p-4 md:p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <Shield size={20} md:size={24} className="text-white" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-white">Ecuatecnology</span>
              <span className="text-xs md:text-sm text-[#B8860B] font-medium">Panel de Administración</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="text-xs md:text-sm font-medium">Administrador</span>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} md:size={24} /> : <Menu size={20} md:size={24} />}
          </button>
          <User size={16} md:size={20} />
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-row flex-1 min-h-[calc(100vh-80px)] w-full">
        <aside className={cn(
          "fixed md:static top-0 left-0 z-40 w-64 md:w-80 bg-white flex flex-col p-4 md:p-6 min-h-full flex-shrink-0 shadow-lg transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
          <button
            className="absolute top-4 right-4 md:hidden text-neutral"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} md:size={24} />
          </button>
          <nav className="flex-1 flex flex-col gap-2 p-2 md:p-4 mt-8 md:mt-0">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg transition-all text-left w-full text-sm md:text-base ${
                    activeSection === item.id
                      ? 'bg-[#B8860B] text-black shadow-md'
                      : 'text-neutral hover:bg-gray-100 hover:text-[#B8860B]'
                  }`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsOpen(false);
                  }}
                >
                  <Icon size={18} md:size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-2 md:p-4 border-t border-gray-200 mt-auto">
            <button
              className="flex items-center gap-2 p-3 md:p-4 rounded-lg transition-all text-left w-full text-red-400 hover:bg-red-50 text-sm md:text-base"
              onClick={handleLogout}
            >
              <LogOut size={18} md:size={20} />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>
        </aside>

        {/* Overlay para móvil */}
        {isOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <main className="flex-1 p-4 md:p-8 bg-background overflow-y-auto w-full min-h-full md:ml-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminModule;
