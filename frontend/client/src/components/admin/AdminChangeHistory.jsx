import React, { useState } from 'react';
import { Search, Download, Calendar, User, Filter, Square } from 'lucide-react';
import '../../styles/AdminChangeHistory.css';

const AdminChangeHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('Todos los usuarios');
  const [selectedAction, setSelectedAction] = useState('Todas las acciones');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Datos de ejemplo del historial de cambios
  const changeHistory = [
    {
      id: 1,
      user: 'admin@ecuatechnology.com',
      module: 'Clientes',
      action: 'Creó un nuevo cliente',
      date: '2025-08-20 10:15',
      details: 'Cliente: DigitalPlus S.A.',
      actionType: 'create'
    },
    {
      id: 2,
      user: 'maria.supervisor@ecuatechnology.com',
      module: 'Tickets',
      action: 'Editó ticket de soporte',
      date: '2025-08-21 14:30',
      details: 'Ticket #123 actualizado a \'Resuelto\'',
      actionType: 'edit'
    },
    {
      id: 3,
      user: 'admin@ecuatechnology.com',
      module: 'Documentos',
      action: 'Eliminó documento',
      date: '2025-08-22 09:05',
      details: 'Contrato_TechSolutions.pdf eliminado',
      actionType: 'delete'
    },
    {
      id: 4,
      user: 'maria.supervisor@ecuatechnology.com',
      module: 'Configuración',
      action: 'Actualizó configuración',
      date: '2025-08-23 11:20',
      details: 'Cambio en configuración de notificaciones',
      actionType: 'update'
    },
    {
      id: 5,
      user: 'admin@ecuatechnology.com',
      module: 'Administradores',
      action: 'Agregó administrador',
      date: '2025-08-24 15:45',
      details: 'Nuevo administrador: Juan Pérez',
      actionType: 'create'
    }
  ];

  // Opciones para los filtros
  const userOptions = ['Todos los usuarios', 'admin@ecuatechnology.com', 'maria.supervisor@ecuatechnology.com'];
  const actionOptions = ['Todas las acciones', 'Crear', 'Editar', 'Eliminar', 'Actualizar'];

  // Filtrar datos
  const filteredHistory = changeHistory.filter(change => {
    const matchesSearch = 
      change.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = selectedUser === 'Todos los usuarios' || change.user === selectedUser;
    const matchesAction = selectedAction === 'Todas las acciones' || 
      change.action.toLowerCase().includes(selectedAction.toLowerCase());
    
    const matchesDate = (!startDate || change.date >= startDate) && 
                       (!endDate || change.date <= endDate);
    
    return matchesSearch && matchesUser && matchesAction && matchesDate;
  });

  const handleDownloadHistory = (format) => {
    console.log(`Descargando historial en formato ${format}`);
    // Aquí implementarías la lógica para descargar el historial
  };

  const getActionBadgeClass = (actionType) => {
    switch (actionType) {
      case 'create':
        return 'action-badge create';
      case 'edit':
        return 'action-badge edit';
      case 'delete':
        return 'action-badge delete';
      case 'update':
        return 'action-badge update';
      default:
        return 'action-badge';
    }
  };

  return (
    <div className="admin-content-section">
      <div className="admin-change-history-section">
      <div className="change-history-header">
        <h1>Historial de Cambios</h1>
        <button 
          className="download-button"
          onClick={() => handleDownloadHistory('pdf')}
          title="Descargar Historial"
        >
          <Download size={20} />
          Descargar Historial
        </button>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <h3>Filtros</h3>
        <div className="filters-grid">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="filter-select"
          >
            {userOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="filter-select"
          >
            {actionOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          <div className="date-range-group">
            <div className="date-input-wrapper">
              <Calendar size={20} className="date-icon left" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="date-input"
              />
              <Square size={16} className="date-icon right" />
            </div>
            <span className="date-separator">hasta</span>
            <div className="date-input-wrapper">
              <Calendar size={20} className="date-icon left" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="date-input"
              />
              <Square size={16} className="date-icon right" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de historial */}
      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Módulo</th>
              <th>Acción</th>
              <th>Fecha</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((change) => (
              <tr key={change.id}>
                <td className="change-id">#{change.id}</td>
                <td className="change-user">{change.user}</td>
                <td>
                  <span className="module-badge">{change.module}</span>
                </td>
                <td>
                  <span className={getActionBadgeClass(change.actionType)}>
                    {change.action}
                  </span>
                </td>
                <td className="change-date">{change.date}</td>
                <td className="change-details">{change.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredHistory.length === 0 && (
        <div className="no-results">
          <p>No se encontraron resultados con los filtros aplicados.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminChangeHistory;
