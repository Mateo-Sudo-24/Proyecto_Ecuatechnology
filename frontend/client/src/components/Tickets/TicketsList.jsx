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
  }, [fetchDataBackend]);

  if (loading) return <p>Cargando tickets...</p>;
  if (!tickets.length) return <p>No hay tickets aún.</p>;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="p-3 md:p-4 border border-neutral-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center bg-background hover:shadow-md transition-shadow gap-2 md:gap-0"
        >
          <div>
            <p className="font-semibold text-xs md:text-sm text-neutral">{ticket.descripcion}</p>
            <p className="text-xs text-neutral-600">
              Estado: {ticket.estado} | Proforma: {ticket.proformaEstado || "-"}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/clientes/tickets/${ticket.id}/invoice`}
              className="text-primary text-xs md:text-sm font-semibold hover:text-primary-dark transition-colors"
            >
              Ver Factura
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
