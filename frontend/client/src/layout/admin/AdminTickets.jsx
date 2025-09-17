import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Pencil, Download, FileSpreadsheet, FileText, ArrowLeft } from 'lucide-react';
import TicketModal from './TicketModal';
import TicketDetails from './TicketDetails';
import '../../styles/admin.css';

const AdminTickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos los estados');
  const [dateFilter, setDateFilter] = useState('');
  const [showDownloadOptions, setShowDownloadOptions] = useState(null);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
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

  const tickets = [
    {
      id: 1,
      number: "#1",
      title: "Error en sistema de facturación",
      description: "El sistema no permite generar facturas desde el módulo de ventas",
      client: "Juan Pérez - Tech Solutions S.A.",
      status: "abierto",
      priority: "alta",
      assignedTo: "Soporte Técnico",
      category: "Software",
      date: "2024-03-13"
    },
    {
      id: 2,
      number: "#2",
      title: "Cotización contrato de mantenimiento",
      description: "Solicitud de propuesta para contrato anual de mantenimiento",
      client: "María González - Innovate Corp",
      status: "en progreso",
      priority: "media",
      assignedTo: "Ventas",
      category: "Contratos Empresariales",
      date: "2024-03-10"
    },
    {
      id: 3,
      number: "#3",
      title: "Solicitud de repuestos para impresora",
      description: "Necesitamos cartuchos de tinta para la impresora HP modelo...",
      client: "Carlos Rodríguez - Digital Plus",
      status: "cerrado",
      priority: "baja",
      assignedTo: "Ventas",
      category: "Repuestos y Accesorios",
      date: "2024-03-05"
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos los estados' || ticket.status === statusFilter.toLowerCase();
    const matchesDate = !dateFilter || ticket.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleDownload = (format, ticket) => {
    setShowDownloadOptions(null);
    console.log(`Descargando ticket #${ticket.number} en formato ${format}`);
  };

  const handleNewTicket = () => {
    setIsNewTicketModalOpen(true);
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleSubmitNewTicket = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTicket = {
      id: tickets.length + 1,
      number: `#${tickets.length + 1}`,
      title: formData.get('title'),
      description: formData.get('description'),
      client: formData.get('client'),
      status: 'abierto',
      priority: formData.get('priority'),
      assignedTo: formData.get('assignedTo'),
      category: formData.get('category'),
      date: new Date().toISOString().split('T')[0]
    };
    
    console.log('Nuevo ticket:', newTicket);
    setIsNewTicketModalOpen(false);
  };

  const handleSubmitEditTicket = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedTicket = {
      ...editingTicket,
      title: formData.get('title'),
      description: formData.get('description'),
      client: formData.get('client'),
      status: formData.get('status'),
      priority: formData.get('priority'),
      assignedTo: formData.get('assignedTo'),
      category: formData.get('category')
    };
    
    console.log('Ticket actualizado:', updatedTicket);
    setEditingTicket(null);
  };

  if (selectedTicket) {
    return (
      <div className="admin-tickets-section">
        <div className="tickets-header">
          <button className="back-button" onClick={() => setSelectedTicket(null)}>
            <ArrowLeft size={20} />
            Volver a Tickets
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
          <button className="new-ticket-button" onClick={handleNewTicket}>
            <Plus size={20} />
            Nuevo Ticket
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
                  <span className={`status-badge ${ticket.status.replace(' ', '-')}`}>
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
                      onClick={() => handleEditTicket(ticket)}
                    >
                      <Pencil size={20} />
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
