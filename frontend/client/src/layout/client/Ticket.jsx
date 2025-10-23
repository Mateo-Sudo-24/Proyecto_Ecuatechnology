import { useState, useEffect, useCallback } from "react";
import { Ticket, Plus } from "lucide-react";
import ModalCrearTicket from "../../components/Tickets/ModalCrearTicket";
import useFetch from "../../hooks/useFetch";

const TicketPage = () => {
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
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 drop-shadow-md">
          <Ticket className="inline-block mr-2" size={32} />
          Tickets
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#8B6914] transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
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
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-gray-800 mb-1">
                  {ticket.titulo || `Ticket #${ticket.id}`}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {ticket.descripcion || "Sin descripción"}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  ticket.estado
                )}`}
              >
                {ticket.estado || "Pendiente"}
              </span>
            </div>

            {(ticket.tipo || ticket.diagnostico || ticket.precio || ticket.proforma) && (
              <div className="space-y-1 text-sm text-gray-500 border-t border-gray-100 pt-3">
                {ticket.tipo && <p><span className="font-medium">Tipo:</span> {ticket.tipo}</p>}
                {ticket.diagnostico && <p><span className="font-medium">Diagnóstico:</span> {ticket.diagnostico}</p>}
                {ticket.precio && <p><span className="font-medium">Precio:</span> ${ticket.precio}</p>}
                {ticket.proforma && <p><span className="font-medium">Proforma:</span> {ticket.proforma}</p>}
              </div>
            )}
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

export default TicketPage;
