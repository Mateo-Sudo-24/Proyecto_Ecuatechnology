// src/components/client/DashboardCliente.jsx

import { useState } from "react";
import { NavLink, useLocation, Link, Routes, Route } from "react-router-dom";
import { Wrench, Ticket, User, Menu, X, Home } from "lucide-react";

import DashboardPage from "./DashboardPage";
import MantenimientosPage from "./MantenimientosPage";
import Perfil from "./Profile";
import Tickets from "./Ticket";

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
    <div
      id="dashboard_cliente"
      className=" flex min-h-screen  bg-[var(--background)] text-[var(--neutral)] "
    >
      <div
        style={{
          height: "45.5rem",
          borderRight: "1px solid var(--neutral)",
          background: "var(--background)",
          color: "var(--primary)",
          position: "sticky", // se pega al hacer scroll
          top: 0,
          display: "flex",
          flexDirection: "column",
        }}
        className="w-64 h-screen  "

      >
        <div
          style={{ color: "var(--primary)", background: "var(--background)" }}
          className="flex h-16 items-center justify-center border-b border-black/10 px-6"
        >
          <h1 className="text-[1.4rem] font-bold">Dashboard Cliente</h1>
        </div>

        <nav className="flex-1 space-y-2 p-4 ">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname === "/cliente" && item.href === "/cliente");

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

        <div className="border-t border-[var(--neutral)]/10 p-4 my-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[var(--primary)]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--neutral)]">
                Usuario Cliente
              </p>
              <p className="text-xs text-[var(--neutral)]/60">
                cliente@empresa.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="mantenimientos" element={<MantenimientosPage />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="perfil" element={<Perfil />} />
      </Routes>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-[var(--neutral)]/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardCliente;
