// src/components/tickets/TicketsList.jsx
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const { fetchDataBackend } = useFetch();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchDataBackend("/tickets");
        setTickets(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  if (loading) return <p>Cargando tickets...</p>;
  if (!tickets.length) return <p>No hay tickets aún.</p>;

  return (
    <div className="flex flex-col gap-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="p-4 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="font-medium text-sm">{ticket.descripcion}</p>
            <p className="text-xs text-neutral opacity-70">
              Estado: {ticket.estado} | Proforma: {ticket.proformaEstado || "-"}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/clientes/tickets/${ticket.id}/invoice`}
              className="text-primary text-sm font-medium hover:underline"
            >
              Ver Factura
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
