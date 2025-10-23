// src/layout/client/ClientePage.jsx
import { useEffect, useState, useCallback } from "react";
import { Ticket, FileDown, Eye, X } from "lucide-react";
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
  const [showProformaModal, setShowProformaModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Cargar tickets del cliente
  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDataBackend("clientes/tickets");
      console.log("Tickets cargados:", data);
      setTickets(data || []);

      // Debug: mostrar información de tickets con proformas
      const proformaTickets = data.filter(t => t.estado === "Esperando Aprobación");
      console.log("Tickets con proformas pendientes:", proformaTickets);

    } catch (err) {
      console.error("Error al cargar tickets:", err);
      setError(err.message);
      setTickets([]);
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

  // Ver proforma en modal
  const handleViewProforma = (ticket) => {
    setSelectedTicket(ticket);
    setShowProformaModal(true);
  };

  // Descargar proforma PDF
  const handleDownloadProforma = async (ticketId) => {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al descargar la proforma");
      }

      // El backend ahora devuelve el PDF directamente como blob
      const blob = await response.blob();

      // Verificar que sea un PDF
      if (blob.type !== 'application/pdf') {
        throw new Error("El archivo recibido no es un PDF válido");
      }

      const url = window.URL.createObjectURL(blob);

      // Crear enlace temporal para descarga
      const link = document.createElement("a");
      link.href = url;
      link.download = `proforma_ticket_${ticketId}.pdf`;
      link.click();

      // Liberar URL después de un breve delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);

      console.log(`Proforma del ticket ${ticketId} descargada exitosamente`);
    } catch (err) {
      console.error("Error al descargar proforma:", err);
      alert(`Error al descargar la proforma: ${err.message}`);
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
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Inicio</h2>

      {/* Indicador de tickets creados */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Tickets Creados</h3>
          <Ticket className="h-5 w-5 text-[#B8860B]" />
        </div>
        <div className="card-body">
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="bg-[#B8860B] h-4 rounded-full transition-all"
              style={{ width: progressWidth }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {totalTickets} ticket{totalTickets !== 1 ? "s" : ""} cread
            {totalTickets !== 1 ? "os" : "o"}
          </p>
        </div>
      </div>

      {/* Lista de proformas pendientes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          Proformas Pendientes
        </h3>


        {tickets.filter(
          (t) => t.estado === "Esperando Aprobación"
        ).length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-2">No hay proformas pendientes.</p>
            {/* Debug: Mostrar algunos tickets para verificar estados */}
            {tickets.length > 0 && (
              <div className="text-xs text-gray-400 mt-2">
                Tickets disponibles: {tickets.map(t => `ID:${t.id} Estado:${t.estado}`).join(', ')}
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          {tickets
            .filter((t) => t.estado === "Esperando Aprobación")
            .map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6"
              >
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        {ticket.titulo || `Ticket #${ticket.id}`}
                      </p>
                      <p className="text-sm text-gray-500">{ticket.descripcion}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewProforma(ticket)}
                        className="bg-[#B8860B] text-white px-4 py-2 rounded hover:bg-[#8B6914] transition-all flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" /> Ver Proforma
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal para ver proforma */}
      {showProformaModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Proforma de Servicio</h3>
                <button
                  onClick={() => setShowProformaModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Header de la proforma */}
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">ECUATECHNOLOGY S.A.</h4>
                <p className="text-lg text-gray-700">PROFORMA DE SERVICIO</p>
                <div className="w-full h-px bg-gray-300 mt-4"></div>
              </div>

              {/* Información de la empresa */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Dirección: Quito, Ecuador</p>
                <p className="text-sm text-gray-600 mb-1">Teléfono: +593 962590039</p>
                <p className="text-sm text-gray-600">Email: contacto@ecuatecnology.com</p>
              </div>

              {/* Información del ticket y cliente */}
              <div className="mb-6">
                <h5 className="font-bold text-gray-900 mb-3">INFORMACIÓN DEL SERVICIO</h5>
                <div className="space-y-2">
                  <p><span className="font-medium">Número de Ticket:</span> #{selectedTicket.id}</p>
                  <p><span className="font-medium">Fecha de solicitud:</span> {new Date(selectedTicket.createdAt).toLocaleDateString('es-ES')}</p>
                  <p><span className="font-medium">Estado:</span> {selectedTicket.estado}</p>
                </div>
              </div>

              {/* Detalles de la proforma */}
              <div className="mb-6">
                <h5 className="font-bold text-gray-900 mb-3">DETALLES DEL SERVICIO</h5>
                <div className="text-gray-700 whitespace-pre-line">
                  {selectedTicket.proformaDetalles}
                </div>
              </div>

              {/* Diagnóstico si existe */}
              {selectedTicket.diagnostico && (
                <div className="mb-6">
                  <h5 className="font-bold text-gray-900 mb-3">DIAGNÓSTICO TÉCNICO</h5>
                  <div className="text-gray-700 whitespace-pre-line">
                    {selectedTicket.diagnostico}
                  </div>
                </div>
              )}

              {/* Precio total */}
              <div className="mb-6">
                <h5 className="font-bold text-gray-900 mb-3">PRECIO TOTAL</h5>
                <p className="text-xl font-bold text-[#B8860B]">${selectedTicket.precioTotal}</p>
              </div>

              {/* Información de aprobación */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Estado de la proforma:</span> Pendiente de aprobación
                </p>
                <p className="text-sm text-gray-600">
                  Para aprobar o rechazar esta proforma, revisa los detalles y usa los botones correspondientes.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    handleProformaAction(selectedTicket.id, "aprobar");
                    setShowProformaModal(false);
                  }}
                  className="bg-[#B8860B] text-white px-6 py-2 rounded hover:bg-[#8B6914] transition-all flex-1"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => {
                    handleProformaAction(selectedTicket.id, "rechazar");
                    setShowProformaModal(false);
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-all flex-1"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => handleDownloadProforma(selectedTicket.id)}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                >
                  <FileDown className="h-4 w-4" /> Descargar PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientePage;
