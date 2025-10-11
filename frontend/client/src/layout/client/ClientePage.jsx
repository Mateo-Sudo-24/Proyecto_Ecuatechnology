// src/layout/client/ClientePage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Ticket, FileDown } from "lucide-react";
import useFetch from "../../hooks/useFetch";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Card = ({ className, children }) => (
  <div
    className={cn(
      "rounded-lg border bg-white shadow-sm text-gray-900 p-6",
      className
    )}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex justify-between items-center mb-2">{children}</div>
);
const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);
const CardContent = ({ children }) => <div className="mt-2">{children}</div>;

const ClientePage = () => {
  const { fetchDataBackend } = useFetch();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar tickets del cliente
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

  // Aprobar o rechazar proforma
  const handleProformaAction = async (ticketId, action) => {
    try {
      const updated = await fetchDataBackend(
        "clientes/tickets/proforma",
        { ticketId, action },
        "POST"
      );
      setTickets((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      console.error("Error en acción proforma:", err);
    }
  };

  // Descargar factura PDF
  const handleDownloadInvoice = async (ticketId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_BACK}/clientes/tickets/${ticketId}/invoice`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al descargar la factura");

      // Convertir respuesta a blob (PDF)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Crear enlace temporal para descarga
      const link = document.createElement("a");
      link.href = url;
      link.download = `factura_ticket_${ticketId}.pdf`;
      link.click();

      // Liberar URL
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al descargar factura:", err);
      alert("No se pudo descargar la factura.");
    }
  };

  if (loading)
    return (
      <p className="p-6 font-sans text-gray-500">Cargando dashboard...</p>
    );
  if (error)
    return <p className="p-6 font-sans text-red-500">Error: {error}</p>;

  const totalTickets = tickets.length;
  const progressWidth = `${Math.min(totalTickets * 10, 100)}%`;

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Inicio</h2>

      {/* Indicador de tickets creados */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets Creados</CardTitle>
          <Ticket className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="bg-blue-400 h-4 rounded-full transition-all"
              style={{ width: progressWidth }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {totalTickets} ticket{totalTickets !== 1 ? "s" : ""} cread
            {totalTickets !== 1 ? "os" : "o"}
          </p>
        </CardContent>
      </Card>

      {/* Lista de proformas pendientes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          Proformas Pendientes
        </h3>
        {tickets.filter(
          (t) => t.estado?.toLowerCase() === "esperando aprobación"
        ).length === 0 && (
          <p className="text-gray-500">No hay proformas pendientes.</p>
        )}

        <div className="space-y-4">
          {tickets
            .filter((t) => t.estado?.toLowerCase() === "esperando aprobación")
            .map((ticket) => (
              <div
                key={ticket.id}
                className="border p-4 rounded shadow flex justify-between items-center bg-white"
              >
                <div>
                  <p className="font-semibold">
                    {ticket.titulo || `Ticket #${ticket.id}`}
                  </p>
                  <p className="text-sm text-gray-500">{ticket.descripcion}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleProformaAction(ticket.id, "aprobar")
                    }
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() =>
                      handleProformaAction(ticket.id, "rechazar")
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(ticket.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm flex items-center gap-1"
                  >
                    <FileDown className="h-4 w-4" /> Factura
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClientePage;
