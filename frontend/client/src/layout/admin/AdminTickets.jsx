import React, { useState, useEffect } from 'react';
import { Search, Eye, Pencil, Download, FileSpreadsheet, FileText, ArrowLeft, RefreshCw } from 'lucide-react';
import TicketModal from './TicketModal';
import TicketDetails from './TicketDetails';
import useFetchAdminTickets from '../../hooks/useFetchAdminTickets';
import '../../styles/admin.css';

const AdminTickets = () => {
  // Usar el hook para obtener tickets del backend
  const { tickets: ticketsFromBackend, loading, error, fetchTickets } = useFetchAdminTickets();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos los estados');
  const [dateFilter, setDateFilter] = useState('');
  const [showDownloadOptions, setShowDownloadOptions] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDownloadOptions && !event.target.closest('.download-container')) {
        setShowDownloadOptions(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDownloadOptions]);

  // Función para mapear datos del backend al formato de la interfaz
  const mapTicketForDisplay = (backendTicket) => {
    // Función para convertir el estado del backend al formato de clase CSS
    const formatStatusForCSS = (estado) => {
      switch(estado.toLowerCase()) {
        case 'ingresado':
          return 'ingresado';
        case 'en diagnóstico':
        case 'en-diagnostico':
          return 'en-diagnostico';
        case 'esperando aprobación':
        case 'esperando-aprobacion':
          return 'esperando-aprobacion';
        case 'en reparación':
        case 'en-reparacion':
          return 'en-reparacion';
        case 'completado':
          return 'completado';
        case 'cerrado':
          return 'cerrado';
        default:
          return 'ingresado';
      }
    };

    return {
      id: backendTicket.id,
      number: `#${backendTicket.id}`,
      title: backendTicket.descripcion,
      description: "Descripción del ticket desde el backend",
      client: `${backendTicket.cliente.nombre} - ${backendTicket.cliente.email}`,
      status: backendTicket.estado.toLowerCase(),
      statusClass: formatStatusForCSS(backendTicket.estado),
      date: new Date(backendTicket.createdAt).toISOString().split('T')[0]
    };
  };

  // Usar datos del backend o datos mock si hay error
  const tickets = ticketsFromBackend.length > 0
    ? ticketsFromBackend.map(mapTicketForDisplay)
    : [];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos los estados' || ticket.status === statusFilter.toLowerCase();
    const matchesDate = !dateFilter || ticket.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleDownload = async (format, ticket) => {
    setShowDownloadOptions(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert('No hay token de autenticación válido');
        return;
      }

      if (format === 'pdf') {
        // Descargar el ticket como HTML (que se puede guardar como PDF)
        const response = await fetch(`http://localhost:3000/api/admin/tickets/${ticket.id}/download`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al descargar el ticket');
        }

        const htmlContent = await response.text();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket_${ticket.number}.html`;
        a.click();
        window.URL.revokeObjectURL(url);

        console.log(`Ticket #${ticket.number} descargado exitosamente`);
      } else if (format === 'excel') {
        // Para Excel, por ahora solo mostramos un mensaje
        // En una implementación completa, crearíamos un endpoint que genere Excel
        alert('La descarga en formato Excel estará disponible próximamente');
      }
    } catch (error) {
      console.error('Error al descargar:', error);
      alert('Error al descargar el ticket: ' + error.message);
    }
  };


  if (selectedTicket) {
    return (
      <div className="admin-tickets-section">
        <div className="tickets-header">
          <button className="back-link" onClick={() => setSelectedTicket(null)}>
            ← Volver a Tickets
          </button>
          <h1>Detalle del Ticket</h1>
        </div>
        <TicketDetails ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />
      </div>
    );
  }

  return (
    <div className="admin-tickets-section">
      <div className="tickets-header">
        <h1>Tickets de Soporte</h1>
      </div>

      {/* Mostrar estados de carga y error */}
      {loading && (
        <div className="loading-message">
          <p>Cargando tickets...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchTickets} className="retry-button">
            Reintentar
          </button>
        </div>
      )}

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
            <option>Abierto</option>
            <option>En progreso</option>
            <option>Cerrado</option>
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
            onClick={fetchTickets}
            className="refresh-button"
            title="Actualizar Tickets"
          >
            <RefreshCw size={16} />
            Actualizar
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
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="ticket-info">
                  <span className="ticket-number">{ticket.number}</span>
                  <div className="ticket-details">
                    <span className="ticket-title">{ticket.title}</span>
                    <span className="ticket-description">{ticket.description}</span>
                  </div>
                </td>
                <td>{ticket.client}</td>
                <td>
                  <span className={`status-badge ${ticket.statusClass}`}>
                    {ticket.status}
                  </span>
                </td>
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
                    <div className="download-container">
                      <button
                        className="action-button download"
                        title="Descargar ticket"
                        onClick={() => setShowDownloadOptions(ticket.id)}
                      >
                        <Download size={20} />
                      </button>
                      {showDownloadOptions === ticket.id && (
                        <div className="download-options ticket-download-options">
                          <button onClick={() => handleDownload('pdf', ticket)}>
                            <FileText size={16} />
                            PDF
                          </button>
                          <button onClick={() => handleDownload('excel', ticket)}>
                            <FileSpreadsheet size={16} />
                            Excel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminTickets;
