import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Download,
  FileSpreadsheet,
  FileText,
  ArrowLeft,
} from "lucide-react";
import TicketModal from "./TicketModal";
import TicketDetails from "./TicketDetails";
import useFetch from "../../hooks/useFetch";
import "../../styles/admin.css";

const AdminTickets = () => {
  const { fetchDataBackend } = useFetch();
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos los estados");
  const [dateFilter, setDateFilter] = useState("");
  const [showDownloadOptions, setShowDownloadOptions] = useState(null);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // -------------------------------
  // Normalizar tickets del backend
  // -------------------------------
  const normalizeTickets = (data) =>
    data.map((t) => ({
      id: t.id,
      number: `T-${t.id}`,
      title: t.descripcion || "Sin título",
      description: t.descripcion || "Sin descripción",
      client: t.cliente?.nombre || "Sin nombre",
      clientEmail: t.cliente?.email || "",
      status: t.estado || "Ingresado",
      priority: t.prioridad || "Media",
      assignedTo: t.asignado || "No asignado",
      category: t.categoria || "General",
      date: t.createdAt
        ? new Date(t.createdAt).toISOString().split("T")[0]
        : "",
      diagnostico: t.diagnostico || "",
    }));

  // -------------------------------
  // Cargar tickets reales
  // -------------------------------
  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchDataBackend("admin/tickets");
        setTickets(normalizeTickets(data));
      } catch (error) {
        console.error("Error al cargar tickets:", error.message);
      }
    };
    loadTickets();
  }, [fetchDataBackend]);

  // -------------------------------
  // Filtrado de tickets
  // -------------------------------
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Todos los estados" ||
      ticket.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDate = !dateFilter || ticket.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // -------------------------------
  // Descargas PDF/XML
  // -------------------------------
  const handleDownload = (type, ticket) => {
    if (type === "pdf") {
      window.open(
        `${import.meta.env.VITE_URL_BACK}/admin/tickets/${ticket.id}/invoice/pdf`,
        "_blank"
      );
    } else if (type === "xml") {
      window.open(
        `${import.meta.env.VITE_URL_BACK}/admin/tickets/${ticket.id}/invoice/xml`,
        "_blank"
      );
    }
    setShowDownloadOptions(null);
  };

  // -------------------------------
  // Crear/Editar tickets
  // -------------------------------
  const handleSubmitNewTicket = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTicket = {
      descripcion: formData.get("title"),
      clienteId: formData.get("clientId"),
      estado: "Ingresado",
      prioridad: formData.get("priority"),
      asignado: formData.get("assignedTo"),
      categoria: formData.get("category"),
    };
    try {
      const created = await fetchDataBackend("admin/tickets", newTicket, "POST");
      setTickets((prev) => [...prev, ...normalizeTickets([created])]);
      setIsNewTicketModalOpen(false);
    } catch (error) {
      console.error("Error al crear ticket:", error.message);
    }
  };

  const handleSubmitEditTicket = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedTicket = {
      descripcion: formData.get("title"),
      estado: formData.get("status"),
      prioridad: formData.get("priority"),
      asignado: formData.get("assignedTo"),
      categoria: formData.get("category"),
    };
    try {
      const edited = await fetchDataBackend(
        `admin/tickets/${editingTicket.id}`,
        updatedTicket,
        "PUT"
      );
      setTickets((prev) =>
        prev.map((t) =>
          t.id === edited.id ? normalizeTickets([edited])[0] : t
        )
      );
      setEditingTicket(null);
    } catch (error) {
      console.error("Error al actualizar ticket:", error.message);
    }
  };

  // -------------------------------
  // Diagnóstico
  // -------------------------------
  const handleAddDiagnosis = async (ticketId) => {
    const diagnosis = prompt("Ingrese el diagnóstico:");
    if (!diagnosis) return;
    try {
      const updated = await fetchDataBackend(
        `admin/tickets/${ticketId}/diagnose`,
        { diagnostico: diagnosis },
        "POST"
      );
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? normalizeTickets([updated.ticket])[0]
            : t
        )
      );
    } catch (error) {
      console.error("Error al agregar diagnóstico:", error.message);
    }
  };

  // -------------------------------
  // Actualizar estado
  // -------------------------------
  const handleUpdateStatus = async (ticketId) => {
    const newStatus = prompt(
      "Ingrese el nuevo estado (ej: En Reparación, Completado, Listo para Entrega):"
    );
    if (!newStatus) return;
    try {
      const updated = await fetchDataBackend(
        `admin/tickets/${ticketId}/status`,
        { nuevoEstado: newStatus },
        "POST"
      );
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? normalizeTickets([updated.ticket])[0]
            : t
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error.message);
    }
  };

  // -------------------------------
  // Crear proforma
  // -------------------------------
  const handleCreateProforma = async (ticketId) => {
    const total = prompt("Ingrese el total de la proforma:");
    if (!total) return;
    const detalles =
      prompt("Ingrese detalles de la proforma (opcional):") || "Sin detalles";
    try {
      const updated = await fetchDataBackend(
        `admin/tickets/${ticketId}/proforma`,
        { proformaDetalles: detalles, precioTotal: total },
        "POST"
      );
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? normalizeTickets([updated.ticket])[0]
            : t
        )
      );
    } catch (error) {
      console.error("Error al crear proforma:", error.message);
    }
  };

  // -------------------------------
  // Vista detalle
  // -------------------------------
  if (selectedTicket) {
    return (
      <div className="admin-tickets-section">
        <div className="tickets-header">
          <button
            className="back-button"
            onClick={() => setSelectedTicket(null)}
          >
            <ArrowLeft size={20} /> Volver a Tickets
          </button>
          <h1>Detalle del Ticket</h1>
        </div>
        <TicketDetails
          ticket={selectedTicket}
          onBack={() => setSelectedTicket(null)}
        />
      </div>
    );
  }

  // -------------------------------
  // Render principal
  // -------------------------------
  return (
    <div className="admin-tickets-section">
      <div className="tickets-header">
        <h1>Tickets de Soporte</h1>
      </div>

      <div className="tickets-controls">
        <div className="search-filter-group">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option>Todos los estados</option>
            <option>Ingresado</option>
            <option>En Diagnóstico</option>
            <option>Esperando Aprobación</option>
            <option>En Reparación</option>
            <option>Completado</option>
            <option>Listo para Entrega</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="date-filter"
          />
        </div>

        <div className="tickets-actions">
          <button
            className="new-ticket-button"
            onClick={() => setIsNewTicketModalOpen(true)}
          >
            <Plus size={20} /> Nuevo Ticket
          </button>
        </div>
      </div>

      <div className="tickets-table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Asignado</th>
              <th>Fecha</th>
              <th>Acciones</th>
              <th>Extras</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="ticket-info">
                  <span className="ticket-number">{ticket.number}</span>
                  <div className="ticket-details">
                    <span className="ticket-title">{ticket.title}</span>
                    <span className="ticket-description">
                      {ticket.description}
                    </span>
                  </div>
                </td>
                <td>{ticket.client}</td>
                <td>
                  <span className={`status-badge ${ticket.status.replace(" ", "-")}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>
                  <span className={`priority-badge ${ticket.priority}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td>{ticket.assignedTo}</td>
                <td>{ticket.date}</td>
                <td>
                  <div className="ticket-actions">
                    <button
                      className="action-button view"
                      title="Ver detalles"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className="action-button edit"
                      title="Editar ticket"
                      onClick={() => setEditingTicket(ticket)}
                    >
                      <Pencil size={20} />
                    </button>
                    <div className="download-container">
                      <button
                        className="action-button download"
                        title="Descargar factura"
                        onClick={() => setShowDownloadOptions(ticket.id)}
                      >
                        <Download size={20} />
                      </button>
                      {showDownloadOptions === ticket.id && (
                        <div className="download-options ticket-download-options">
                          <button onClick={() => handleDownload("pdf", ticket)}>
                            <FileText size={16} /> PDF
                          </button>
                          <button onClick={() => handleDownload("xml", ticket)}>
                            <FileSpreadsheet size={16} /> XML
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    className="action-button diagnose"
                    onClick={() => handleAddDiagnosis(ticket.id)}
                  >
                    Diagnóstico
                  </button>
                  <button
                    className="action-button proforma"
                    onClick={() => handleCreateProforma(ticket.id)}
                  >
                    Proforma
                  </button>
                  <button
                    className="action-button status"
                    onClick={() => handleUpdateStatus(ticket.id)}
                  >
                    Cambiar Estado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      <TicketModal
        isOpen={isNewTicketModalOpen}
        onClose={() => setIsNewTicketModalOpen(false)}
        title="Nuevo Ticket"
        onSubmit={handleSubmitNewTicket}
      />
      <TicketModal
        isOpen={editingTicket !== null}
        onClose={() => setEditingTicket(null)}
        title={`Editar Ticket ${editingTicket?.number}`}
        ticket={editingTicket}
        onSubmit={handleSubmitEditTicket}
      />
    </div>
  );
};

export default AdminTickets;
