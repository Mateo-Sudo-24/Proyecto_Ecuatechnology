import React, { useState, useEffect } from 'react';
import { Search, Eye, Pencil, Download, FileSpreadsheet, FileText, ArrowLeft, RefreshCw } from 'lucide-react';
import TicketModal from './TicketModal';
import TicketDetails from './TicketDetails';
import useFetchAdminTickets from '../../hooks/useFetchAdminTickets';

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
    // Filtro de búsqueda mejorado - busca por ID, título, cliente y descripción
    const matchesSearch =
      ticket.number.toLowerCase().includes(searchTerm.toLowerCase()) || // Buscar por ID (#1, #2, etc.)
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Buscar por título
      ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) || // Buscar por cliente
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()); // Buscar por descripción

    // Filtro de estado mejorado - mapea los estados reales del backend
    const matchesStatus = statusFilter === 'Todos los estados' || (() => {
      switch(statusFilter) {
        case 'Ingresado':
          return ticket.status === 'ingresado';
        case 'En Diagnóstico':
          return ticket.status === 'en-diagnostico' || ticket.status === 'en diagnóstico';
        case 'Esperando Aprobación':
          return ticket.status === 'esperando-aprobacion' || ticket.status === 'esperando aprobación';
        case 'En Reparación':
          return ticket.status === 'en-reparacion' || ticket.status === 'en reparación';
        case 'Completado':
          return ticket.status === 'completado';
        case 'Cerrado':
          return ticket.status === 'cerrado';
        default:
          return false;
      }
    })();

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
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-all mb-4"
            onClick={() => setSelectedTicket(null)}
          >
            ← Volver a Tickets
          </button>
          <h1 className="text-3xl font-bold text-neutral">Detalle del Ticket</h1>
        </div>
        <TicketDetails ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral">Tickets de Soporte</h1>
      </div>

      {/* Mostrar estados de carga y error */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-700">Cargando tickets...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 mb-4">Error: {error}</p>
          <button
            onClick={fetchTickets}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-all"
          >
            Reintentar
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por ID (#1), título o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
            >
              <option>Todos los estados</option>
              <option>Ingresado</option>
              <option>En Diagnóstico</option>
              <option>Esperando Aprobación</option>
              <option>En Reparación</option>
              <option>Completado</option>
              <option>Cerrado</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchTickets}
              className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-all"
              title="Actualizar Tickets"
            >
              <RefreshCw size={16} />
              Actualizar
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de resultados */}
      <div className="mb-4">
        <p className="text-gray-600">Mostrando {filteredTickets.length} de {tickets.length} tickets</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Ticket</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Cliente</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Estado</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Fecha</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-neutral-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-primary">{ticket.number}</span>
                      <span className="text-sm text-neutral font-medium">{ticket.title}</span>
                      <span className="text-sm text-gray-500">{ticket.description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-neutral">{ticket.client}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.statusClass === 'ingresado' ? 'bg-blue-100 text-blue-800' :
                      ticket.statusClass === 'en-diagnostico' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.statusClass === 'esperando-aprobacion' ? 'bg-orange-100 text-orange-800' :
                      ticket.statusClass === 'en-reparacion' ? 'bg-purple-100 text-purple-800' :
                      ticket.statusClass === 'completado' ? 'bg-green-100 text-green-800' :
                      ticket.statusClass === 'cerrado' ? 'bg-gray-100 text-gray-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-neutral">{ticket.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                        title="Ver detalles"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <Eye size={20} />
                      </button>
                      <div className="relative">
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-all"
                          title="Descargar ticket"
                          onClick={() => setShowDownloadOptions(ticket.id)}
                        >
                          <Download size={20} />
                        </button>
                        {showDownloadOptions === ticket.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-neutral-200 z-10">
                            <button
                              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-all"
                              onClick={() => handleDownload('pdf', ticket)}
                            >
                              <FileText size={16} />
                              PDF
                            </button>
                            <button
                              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-all"
                              onClick={() => handleDownload('excel', ticket)}
                            >
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

      {/* Mensaje cuando no hay resultados */}
      {filteredTickets.length === 0 && tickets.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700 mb-4">No se encontraron tickets que coincidan con los filtros aplicados.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('Todos los estados');
              setDateFilter('');
            }}
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-all"
          >
            Limpiar Filtros
          </button>
        </div>
      )}

    </div>
  );
};

export default AdminTickets;