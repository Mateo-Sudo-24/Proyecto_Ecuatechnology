// src/components/client/DashboardCliente.jsx

import { useState } from "react";
import { useLocation, Link, Routes, Route } from "react-router-dom";
import { Wrench, Ticket, User, Menu, X, Home } from "lucide-react";

import DashboardPage from "./DashboardPage";
import MantenimientosPage from "./MantenimientosPage"; 

const TicketsPage = () => <div className="p-8">Contenido de Tickets</div>;
const PerfilPage = () => <div className="p-8">Contenido del Perfil</div>;

const cn = (...classes) => classes.filter(Boolean).join(" ");
const navigation = [
  { name: "Dashboard", href: "/cliente", icon: Home },
  { name: "Mantenimientos", href: "/cliente/mantenimientos", icon: Wrench },
  { name: "Tickets", href: "/cliente/tickets", icon: Ticket },
  { name: "Perfil", href: "/cliente/perfil", icon: User },
];

function DashboardCliente() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <section
      id="dashboard_cliente"
      style={{
        color: "var(--background)",
        background: "var(--neutral)",
      }}
      className="flex my-auto h-screen"
    >
      <div>
        <button 
          style={{ 
            background: "var(--transparent)",
            border: "1px solid var(--neutral)",
            color: "var(--primary)",
          }}
          className="md:hidden flex fixed top-4 left-4 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        style={{
          height: "100%",
          borderRadius: "0",
          borderRight: "1px solid var(--neutral)",
          background: "var(--background)",
          color: "var(--primary)",
          display: "flex",
          flexDirection: "column",
        }}
        className={cn(
          "w-64 transform transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div style={{ color: "var(--primary)", background: "var(--background)" }} className="flex h-16 items-center justify-center border-b border-black/10 px-6">
          <h1 className="text-[1.4rem] font-bold">Dashboard Cliente</h1>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname === "/cliente" && item.href === "/cliente");

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--primary)] text-[var(--background)] hover:text-[var(--background)]"
                    : "text-[var(--neutral)] hover:bg-[var(--secondary)] hover:text-[var(--background)]"
                )}
                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Pie de página, ahora restaurado */}
        <div className="border-t border-[var(--neutral)]/10 p-4 my-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[var(--primary)]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--neutral)]">Usuario Cliente</p>
              <p className="text-xs text-[var(--neutral)]/60">cliente@empresa.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="mantenimientos" element={<MantenimientosPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="perfil" element={<PerfilPage />} />
        </Routes>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-[var(--neutral)]/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </section>
  );
}

export default DashboardCliente;
