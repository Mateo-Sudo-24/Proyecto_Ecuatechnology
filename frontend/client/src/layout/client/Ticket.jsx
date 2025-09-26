import React, { useState, useEffect, useCallback } from "react";
import ModalCrearTicket from "../../components/Tickets/ModalCrearTicket";
import useFetch from "../../hooks/useFetch";

const Ticket = () => {
  const { fetchDataBackend } = useFetch();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDataBackend("clientes/tickets");
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchDataBackend]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleTicketCreated = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

// Función para asignar color según estado
const getStatusColor = (estado) => {
  switch (estado?.toLowerCase()) {
    case "pendiente":
      return "bg-yellow-300 text-yellow-800";
    case "ingresado":
      return "bg-orange-300 text-neutral-800"; // agregado naranja
    case "en reparación":
      return "bg-blue-300 text-blue-800";
    case "finalizado":
      return "bg-green-300 text-green-800";
    case "rechazado":
      return "bg-red-300 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Crear Ticket
        </button>
      </div>

      {loading && <p>Cargando tickets...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && tickets.length === 0 && <p>No hay tickets disponibles.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id ?? Math.random()}
            className="border rounded-lg shadow p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">
                {ticket.titulo || `Ticket #${ticket.id}`}
              </h2>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  ticket.estado
                )}`}
              >
                {ticket.estado || "Pendiente"}
              </span>
            </div>
            <p className="mb-1">{ticket.descripcion || "Sin descripción"}</p>
            {ticket.tipo && <p className="text-sm text-gray-500">Tipo: {ticket.tipo}</p>}
            {ticket.diagnostico && <p className="text-sm text-gray-500">Diagnóstico: {ticket.diagnostico}</p>}
            {ticket.precio && <p className="text-sm text-gray-500">Precio: ${ticket.precio}</p>}
            {ticket.proforma && <p className="text-sm text-gray-500">Proforma: {ticket.proforma}</p>}
          </div>
        ))}
      </div>

      <ModalCrearTicket
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTicketCreated={handleTicketCreated}
      />
    </div>
  );
};

export default Ticket;
