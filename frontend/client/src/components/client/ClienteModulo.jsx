// src/components/client/DashboardCliente.jsx

import { useState } from "react";
import { NavLink, useLocation, Link, Routes, Route } from "react-router-dom";
import {
  Wrench,
  Ticket,
  User,
  Menu,
  X,
  Home,
  Shield,
  LogOut,
} from "lucide-react";

import ClientePage from "./ClientePage";
import MantenimientosPage from "./MantenimientosPage";
import Perfil from "./Profile";
import Tickets from "./Ticket";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const navigation = [
  { name: "Inicio", href: "/cliente", icon: Home },
  { name: "Mantenimientos", href: "/cliente/mantenimientos", icon: Wrench },
  { name: "Tickets", href: "/cliente/tickets", icon: Ticket },
  { name: "Perfil", href: "/cliente/perfil", icon: User },
];

function Cliente_Page() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      {/* Encabezado */}
      <header className="bg-neutral text-background p-4 md:p-5 flex justify-between items-center shadow-md z-50 w-full">
        <div className="flex items-center gap-2 ">
          <Shield size={24} className="text-background" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-background">
              Ecuatecnology
            </span>
            <span className="text-sm text-primary font-medium">
              Panel de Cliente
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-background">
          <span className="text-sm font-medium hidden md:block">
            Usuario Cliente
          </span>
          <User size={20} />
          <button
            className="md:hidden text-background"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-[calc(100vh-80px)] w-full">
        {/* Barra Lateral */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-gray-100 border-r border-gray-200 flex flex-col p-6 transition-transform duration-300 ease-in-out md:static md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button
            className="absolute top-4 right-4 md:hidden text-neutral"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
          <nav className="flex-1 flex flex-col gap-1 mt-8 md:mt-0">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 font-medium text-sm",
                    isActive
                      ? "bg-primary text-background font-semibold"
                      : "text-neutral hover:bg-gray-200 hover:text-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-gray-200 pt-6 mt-auto">
            <div className="flex items-center gap-3 ">
              <div className="h-10 w-10 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral">
                  Usuario Cliente
                </p>
                <p className="text-xs text-neutral/60">cliente@empresa.com</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6 mt-4">
              <button className="bg-transparent border border-gray-300 flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 font-medium text-sm text-accent hover:bg-red-100 hover:text-red-600 w-full text-left">
                <LogOut size={20} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay para móvil */}
        {isOpen && (
          <div
            className="fixed inset-0 z-30 bg-neutral/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Contenido Principal */}
        <main className="flex-1 p-4 md:p-8 bg-background overflow-y-auto">
          <Routes>
            <Route path="/" element={<ClientePage />} />
            <Route path="mantenimientos" element={<MantenimientosPage />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="perfil" element={<Perfil />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Cliente_Page;
