import React, { useState } from "react";
import "../../styles/componentes.css";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const Tickets = () => {
  const [tickets] = useState([
    {
      id: "TK-001",
      title: "Problema con aire acondicionado",
      status: "Abierto",
      priority: "Alta",
      category: "HVAC",
      date: "17/11/2024",
      comments: 2,
      assigned: "Juan Pérez",
      location: "Oficina Principal - Piso 3",
    },
    {
      id: "TK-002",
      title: "Solicitud de mantenimiento preventivo",
      status: "En Progreso",
      priority: "Media",
      category: "Mecánico",
      date: "16/11/2024",
      comments: 5,
      assigned: "Carlos Ruiz",
      location: "Torre Principal",
    },
    {
      id: "TK-003",
      title: "Fuga de agua en baño",
      status: "Resuelto",
      priority: "Baja",
      category: "Plomería",
      date: "14/11/2024",
      comments: 3,
      assigned: "Roberto Silva",
      location: "Baños - Piso 2",
    },
    {
      id: "TK-004",
      title: "Problema eléctrico en sala de juntas",
      status: "Pendiente",
      priority: "Alta",
      category: "Eléctrico",
      date: "18/11/2024",
      comments: 1,
      assigned: "María González",
      location: "Sala de Juntas A",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos los estados");
  const [filterPriority, setFilterPriority] = useState("Todas las prioridades");

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "Todos los estados" ||
        ticket.status === filterStatus) &&
      (filterPriority === "Todas las prioridades" ||
        ticket.priority === filterPriority)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Abierto":
        return "text-blue-600";
      case "En Progreso":
        return "text-yellow-600";
      case "Resuelto":
        return "text-green-600";
      case "Pendiente":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    /*mr-[34rem]  padding para pantalla completa */

    <div className="w-full max-w-screen pr-[2rem]  p-[2rem] text-neutral font-sans ">
      <h2 className="text-2xl font-bold text-[var(--neutral)]">Tickets</h2>
      <p className="text-gray-600">
        Gestiona tus solicitudes de servicio y soporte
      </p>

      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-[var(--neutral)/70] font-bold ">
            Mis Tickets
          </span>
          <span className="ml-2 text-white bg-[var(--secondary)] rounded px-3">
            4 tickets
          </span>
        </div>
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-opacity-90">
          + Crear Nuevo Ticket
        </button>
      </div>

      <div className="bg-white p-4 mt-4 rounded-lg shadow-md ">
        <div className=" p-2  border-0 rounded-lg mb-4">
          <h3 className="text-2xl font-semibold leading-none tracking-tight p-4 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </h3>
          <div className="flex space-x-4 mb-4   ">
            <input
              type="text"
              placeholder="Buscar por ID, título o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded placeholder:text-neutral bg-transparent "
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded bg-transparent text-neutral"
            >
              <option>Todos los estados</option>
              <option>Abierto</option>
              <option>En Progreso</option>
              <option>Resuelto</option>
              <option>Pendiente</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="p-2 border border-gray-300 rounded bg-transparent text-neutral"
            >
              <option>Todas las prioridades</option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>
        </div>

        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="border-b py-4 ">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-neutral">
                  {ticket.title}{" "}
                  <span className="text-sm text-gray-500">#{ticket.id}</span>
                </h3>
                <p className="text-gray-600">
                  {ticket.description || ticket.location}
                </p>
                <p className="text-sm text-gray-500">
                  Creado: {ticket.date} | {ticket.comments} comentarios |
                  Asignado a: {ticket.assigned} | Ubicación: {ticket.location}
                </p>
              </div>
              <div className="flex space-x-2">
                <span
                  className={`px-2 py-1 rounded ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </span>
                <span className="px-2 py-1 rounded bg-gray-200">
                  {ticket.priority}
                </span>
                <span className="px-2 py-1 rounded bg-gray-200">
                  {ticket.category}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-2 space-x-5">
  <button className="bg-white text-black font-medium px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-colors border border-neutral/70">
    Descargar Detalles
  </button>
  <button className="bg-primary text-white font-medium px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors border border-neutral/70">
    Agregar Comentario
  </button>
</div>
          </div>
        ))}
      </div>

     <div className="mt-8 grid gap-4 md:grid-cols-4">
  {/* Tarjeta de Total de Tickets */}
  <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
    <div className="p-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-600">{tickets.length}</div>
        <div className="text-sm text-gray-500">Total Tickets</div>
      </div>
    </div>
  </div>

  {/* Tarjeta de Abiertos */}
  <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
    <div className="p-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">
          {tickets.filter((t) => t.status === "Abierto").length}
        </div>
        <div className="text-sm text-gray-500">Abiertos</div>
      </div>
    </div>
  </div>

  {/* Tarjeta de En Progreso */}
  <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
    <div className="p-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-600">
          {tickets.filter((t) => t.status === "En Progreso").length}
        </div>
        <div className="text-sm text-gray-500">En Progreso</div>
      </div>
    </div>
  </div>

  {/* Tarjeta de Resueltos */}
  <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
    <div className="p-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">
          {tickets.filter((t) => t.status === "Resuelto").length}
        </div>
        <div className="text-sm text-gray-500">Resueltos</div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Tickets;
