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
      const data = await fetchDataBackend("clientes/tickets", null, "GET", true);
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
        return "bg-orange-300 text-neutral-800";
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
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-100/40 via-white/20 to-purple-100/40 backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 drop-shadow-md">🎟️ Tickets</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          Crear Ticket
        </button>
      </div>

      {loading && <p className="text-gray-600">Cargando tickets...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && tickets.length === 0 && (
        <p className="text-gray-500 italic">No hay tickets disponibles.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.id ?? Math.random()}
            className="rounded-2xl shadow-lg p-5 bg-white/50 backdrop-blur-lg border border-white/30 transition-transform hover:scale-105"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-xl text-gray-800">
                {ticket.titulo || `Ticket #${ticket.id}`}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getStatusColor(
                  ticket.estado
                )}`}
              >
                {ticket.estado || "Pendiente"}
              </span>
            </div>
            <p className="mb-2 text-gray-700">{ticket.descripcion || "Sin descripción"}</p>
            {ticket.tipo && <p className="text-sm text-gray-600"> Tipo: {ticket.tipo}</p>}
            {ticket.diagnostico && <p className="text-sm text-gray-600">Diagnóstico: {ticket.diagnostico}</p>}
            {ticket.precio && <p className="text-sm text-gray-600">Precio: ${ticket.precio}</p>}
            {ticket.proforma && <p className="text-sm text-gray-600">Proforma: {ticket.proforma}</p>}
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
