import React, { useState } from "react";
import "../../styles/Ticket.css";

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

    <div  
    
    className="w-[79rem] max-w-screen pr-[2rem]  p-[2rem]  ">
      <h2 className="text-2xl text-neutral">Tickets</h2>
      <p className="text-gray-600">Gestiona tus solicitudes de servicio y soporte</p>


        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-neutral">Mis Tickets</span>
            <span className="ml-2 text-blue-600">4 tickets</span>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
            + Crear Nuevo Ticket
          </button>
        </div>

        <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Buscar por ID, título o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded"
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
              className="p-2 border border-gray-300 rounded"
            >
              <option>Todas las prioridades</option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>

          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="border-b py-4">
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
              <div classclassName="mt-2 flex space-x-2">
                <button className="text-blue-600 underline">
                  Descargar Detalles
                </button>
                <button className="text-yellow-600 underline">
                  Agregar Comentario
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4 text-gray-600">
          <span>Usuario Cliente: cliente@empresa.com</span>
          <div className="flex space-x-4">
            <div>Total Tickets: 4</div>
            <div>Abiertos: 1</div>
            <div>En Progreso: 1</div>
            <div>Resueltos: 1</div>
          </div>
        </div>

    </div>
  );
};

export default Tickets;
