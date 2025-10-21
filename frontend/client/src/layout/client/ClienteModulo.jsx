// src/components/client/DashboardCliente.jsx

import { useState, useEffect } from "react";
import {
  NavLink,
  useLocation,
  Link,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import useAuthStore from "../../context/storeAuth";

import {
  Ticket,
  User,
  Menu,
  X,
  Home,
  Users,
  LogOut,
  BarChart3,
} from "lucide-react";

import ClientePage from "./ClientePage";
import Perfil from "./Profile";
import TicketPage from "./Ticket";
import ClienteStatistics from "./ClienteStatistics";
import { useProfileStore } from "../../context/storeProfile";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const navigation = [
  { name: "Inicio", href: "/cliente", icon: Home },
  { name: "Estadísticas", href: "/cliente/estadisticas", icon: BarChart3 },
  { name: "Tickets", href: "/cliente/tickets", icon: Ticket },
  { name: "Perfil", href: "/cliente/perfil", icon: User },
];

function Cliente_Page() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Sacar las funciones de auth global
  const logout = useAuthStore((state) => state.logout);
  const initializeUser = useAuthStore((state) => state.initializeUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const usuario = useProfileStore((state) => state.user) || {};


  // Inicializar perfil desde localStorage
  const initializeProfileFromStorage = useProfileStore((state) => state.initializeFromStorage);


  // Inicializar usuario y cargar perfil automáticamente
  useEffect(() => {
    const initUser = async () => {
      try {
        // Primero intentar cargar desde localStorage
        initializeProfileFromStorage();

        // Luego cargar desde el backend
        await initializeUser();
      } catch (error) {
        console.error("Error al inicializar usuario:", error);
        // Continuar de todos modos para no dejar la pantalla en blanco
      }
    };
    initUser();
  }, [initializeUser, initializeProfileFromStorage]);

  const handleLogout = () => {
    // Limpiar localStorage
    ["token", "role", "email"].forEach((key) => localStorage.removeItem(key));

    // Limpiar stores globales
    logout?.(); // storeAuth
    useProfileStore.getState().clearUser?.(); // storeProfile

    // Redirigir al login
    navigate("/login");
  };
  

  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      {/* Encabezado */}
      <header className="admin-header">
        <div className="admin-header-left">
          <Users size={24} className="text-background mr-4" />
          <div className="admin-logo">
            <div className="admin-logo-text">
              <span className="admin-logo-title">Ecuatecnology</span>
              <span className="admin-logo-subtitle">Panel de Cliente</span>
            </div>
          </div>
        </div>
        <div className="admin-header-right">
          <span className="admin-user-info">
            {usuario?.nombre || "Usuario Desconocido"}
          </span>
          <button
            className="md:hidden text-background"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="admin-layout">
        {/* Barra Lateral */}
        <aside
          className={cn(
            "admin-sidebar",
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <button
            className="absolute top-4 right-4 md:hidden text-neutral"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>

          <nav className="admin-nav">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "admin-nav-item",
                    isActive ? "active" : ""
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <User size={20} className="text-background" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral">
                  {usuario?.nombre || "Nombre Cliente"}
                </p>
                <p className="text-xs text-neutral opacity-60">
                  {usuario?.email || "cliente@empresa.com"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="admin-logout-button"
            >
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </aside>

        {/* Overlay para móvil */}
        {isOpen && (
          <div
            className="fixed inset-0 z-30 bg-neutral opacity-50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Contenido Principal */}
        <main className="admin-main">
          <Routes>
            <Route path="/" element={<ClientePage />} />
            <Route path="estadisticas" element={<ClienteStatistics />} />
            <Route path="tickets" element={<TicketPage />} />
            <Route path="perfil" element={<Perfil />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Cliente_Page;
