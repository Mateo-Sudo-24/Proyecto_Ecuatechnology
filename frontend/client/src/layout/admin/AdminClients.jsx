import React, { useState } from 'react';
import { Search, UserPlus, Eye, Pencil, Trash, Download, FileText, Plus } from 'lucide-react';
import '../../styles/AdminClients.css';

const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [viewingClientDetails, setViewingClientDetails] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  // Datos de ejemplo de clientes
  const clients = [
    {
      id: 1,
      name: 'Juan Pérez',
      company: 'Tech Solutions S.A.',
      email: 'juan.perez@techsolutions.com',
      phone: '099 123 4567',
      services: 3
    },
    {
      id: 2,
      name: 'María González',
      company: 'Innovate Corp',
      email: 'maria.gonzalez@innovate.com',
      phone: '098 765 4321',
      services: 1
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      company: 'Digital Plus',
      email: 'carlos@digitalplus.ec',
      phone: '097 555 0123',
      services: 5
    }
  ];

  // Filtrar clientes basado en la búsqueda
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClient = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client);
    setViewingClientDetails(true);
  };

  const handleBackToList = () => {
    setViewingClientDetails(false);
    setSelectedClient(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí implementarías la lógica para subir el archivo
      console.log('Archivo seleccionado:', file.name);
    }
  };

  const handleEditClient = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    setEditingClient({
      nombre: client.name,
      empresa: client.company,
      email: client.email,
      telefono: client.phone
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingClient(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Aquí implementarías la lógica para guardar los cambios
    console.log('Guardar cambios:', editingClient);
    handleCloseEditModal();
  };

  const handleDeleteClient = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    setClientToDelete(client);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Aquí implementarías la lógica para eliminar el cliente en el backend
    console.log('Eliminando cliente:', clientToDelete.id);
    setShowDeleteModal(false);
    setClientToDelete(null);
  };

  const handleNewClient = () => {
    setShowNewClientModal(true);
  };

  const handleCloseModal = () => {
    setShowNewClientModal(false);
    setNewClient({
      nombre: '',
      empresa: '',
      email: '',
      telefono: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    // Aquí implementarías la lógica para crear el cliente
    console.log('Crear nuevo cliente:', newClient);
    handleCloseModal();
  };

  return (
    <div className="admin-content-section">
      {viewingClientDetails && selectedClient ? (
        // Vista de detalles del cliente
        <div className="client-details-view">
          <div className="details-header">
            <button className="back-link" onClick={handleBackToList}>
              ← Volver a la lista
            </button>
            <h2 className="details-title">Detalle del Cliente</h2>
          </div>

          <div className="details-content">
            <div className="details-main-info">
              <div className="info-section">
                <h3>Información General</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Nombre</label>
                    <p>{selectedClient.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Empresa</label>
                    <p>{selectedClient.company}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{selectedClient.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Teléfono</label>
                    <p>{selectedClient.phone}</p>
                  </div>
                  <div className="info-item">
                    <label>Fecha de Registro</label>
                    <p>2024-01-15</p>
                  </div>
                </div>
              </div>

              <div className="documents-section">
                <h3>Documentos</h3>
                <div className="document-list">
                  <div className="document-item">
                    <div className="document-info">
                      <FileText size={20} className="document-icon" />
                      <span className="document-name">Contrato_TechSolutions.pdf</span>
                    </div>
                    <button className="download-button" title="Descargar documento">
                      <Download size={18} />
                    </button>
                  </div>
                  <div className="document-item">
                    <div className="document-info">
                      <FileText size={20} className="document-icon" />
                      <span className="document-name">Propuesta_Inicial.pdf</span>
                    </div>
                    <button className="download-button" title="Descargar documento">
                      <Download size={18} />
                    </button>
                  </div>
                  <div className="upload-document">
                    <input
                      type="file"
                      id="document-upload"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="document-upload" className="upload-button">
                      <Plus size={18} />
                      Agregar Documento
                    </label>
                  </div>
                </div>
              </div>

              <div className="stats-section">
                <h3>Estadísticas</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <label>Servicios contratados</label>
                    <p>{selectedClient.services}</p>
                  </div>
                  <div className="stat-item">
                    <label>Documentos</label>
                    <p>2</p>
                  </div>
                  <div className="stat-item">
                    <label>Cliente desde</label>
                    <p>2024-01-15</p>
                  </div>
                </div>
              </div>

              <div className="services-section">
                <h3>Historial de Servicios</h3>
                <div className="services-list">
                  <div className="service-item">
                    <div className="service-info">
                      <h4>Desarrollo Web Corporativo</h4>
                      <span className="service-status completed">Completado - 15 Mar 2024</span>
                    </div>
                    <span className="service-price">$2,500</span>
                  </div>
                  <div className="service-item">
                    <div className="service-info">
                      <h4>Mantenimiento Sistema</h4>
                      <span className="service-status in-progress">En progreso - 01 Abr 2024</span>
                    </div>
                    <span className="service-price">$800</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Vista de lista de clientes
        <>
          <div className="admin-content-header">
            <h1 className="admin-content-title">Gestión de Clientes</h1>
          </div>
          
          {/* Barra de búsqueda y botón de nuevo cliente */}
          <div className="admin-clients-controls">
            <div className="admin-search-container">
              <Search size={20} className="admin-search-icon" />
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
              />
            </div>
            <button className="admin-new-client-button" onClick={handleNewClient}>
              <UserPlus size={16} />
              Nuevo Cliente
            </button>
          </div>

          {/* Tabla de clientes */}
          <div className="admin-clients-table-container">
            <table className="admin-clients-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Empresa</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Servicios</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td className="admin-client-name">{client.name}</td>
                    <td className="admin-client-company">{client.company}</td>
                    <td className="admin-client-email">{client.email}</td>
                    <td className="admin-client-phone">{client.phone}</td>
                    <td className="admin-client-services">
                      <span className="admin-services-count">{client.services}</span>
                    </td>
                    <td>
                      <div className="ticket-actions">
                        <button
                          className="action-button view"
                          onClick={() => handleViewClient(client.id)}
                          title="Ver detalles"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          className="action-button edit"
                          onClick={() => handleEditClient(client.id)}
                          title="Editar cliente"
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          className="action-button delete"
                          onClick={() => handleDeleteClient(client.id)}
                          title="Eliminar cliente"
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal de Editar Cliente */}
      {showEditModal && editingClient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Editar Cliente</h2>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-form">
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  value={editingClient.nombre}
                  onChange={(e) => setEditingClient({...editingClient, nombre: e.target.value})}
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="empresa"
                  value={editingClient.empresa}
                  onChange={(e) => setEditingClient({...editingClient, empresa: e.target.value})}
                  placeholder="Nombre de la empresa"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="telefono"
                  value={editingClient.telefono}
                  onChange={(e) => setEditingClient({...editingClient, telefono: e.target.value})}
                  placeholder="Teléfono"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-crear">
                  Guardar Cambios
                </button>
                <button type="button" className="btn-cancelar" onClick={handleCloseEditModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && clientToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirmar Eliminación</h2>
            </div>
            <div className="modal-form">
              <p className="delete-message">
                ¿Estás seguro de que deseas eliminar al cliente <strong>{clientToDelete.name}</strong>?
                <br />
                <span className="delete-warning">Esta acción no se puede deshacer.</span>
              </p>
              <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={() => setShowDeleteModal(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn-delete" onClick={confirmDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Nuevo Cliente */}
      {showNewClientModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Nuevo Cliente</h2>
            </div>
            <form onSubmit={handleCreateClient} className="modal-form">
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  value={newClient.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre completo del cliente"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="empresa"
                  value={newClient.empresa}
                  onChange={handleInputChange}
                  placeholder="Empresa (opcional)"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={newClient.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="telefono"
                  value={newClient.telefono}
                  onChange={handleInputChange}
                  placeholder="Teléfono"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-crear">
                  Crear Cliente
                </button>
                <button type="button" className="btn-cancelar" onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients;
