// src/components/client/DashboardCliente.jsx

import { useState, useEffect } from "react";
import {
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
      <header className="bg-black text-white p-4 md:p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <Users size={20} md:size={24} className="text-white" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-white">Ecuatecnology</span>
              <span className="text-xs md:text-sm text-[#B8860B] font-medium">Panel de Cliente</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-white text-xs md:text-sm font-medium">
            {usuario?.nombre || "Usuario Desconocido"}
          </span>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} md:size={24} /> : <Menu size={20} md:size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-row flex-1 min-h-[calc(100vh-80px)] w-full">
        {/* Barra Lateral */}
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
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg transition-all text-left w-full text-sm md:text-base",
                    isActive
                      ? "bg-[#B8860B] text-black shadow-md"
                      : "text-neutral hover:bg-gray-100 hover:text-[#B8860B]"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} md:size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-2 md:p-4 border-t border-gray-200 mt-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#B8860B] flex items-center justify-center">
                <User size={16} md:size={20} className="text-black" />
              </div>
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium text-neutral">
                  {usuario?.nombre || "Nombre Cliente"}
                </p>
                <p className="text-xs text-gray-500">
                  {usuario?.email || "cliente@empresa.com"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-3 md:p-4 rounded-lg transition-all text-left w-full text-red-400 hover:bg-red-50 text-sm md:text-base"
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

        {/* Contenido Principal */}
        <main className="flex-1 p-4 md:p-8 bg-background overflow-y-auto w-full min-h-full md:ml-0">
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
