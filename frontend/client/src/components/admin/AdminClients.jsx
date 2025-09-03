import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import '../../styles/AdminClients.css';

const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
    console.log('Ver cliente:', clientId);
    // Aquí se implementaría la lógica para ver detalles del cliente
  };

  const handleEditClient = (clientId) => {
    console.log('Editar cliente:', clientId);
    // Aquí se implementaría la lógica para editar cliente
  };

  const handleDeleteClient = (clientId) => {
    console.log('Eliminar cliente:', clientId);
    // Aquí se implementaría la lógica para eliminar cliente
  };

  const handleNewClient = () => {
    console.log('Nuevo cliente');
    // Aquí se implementaría la lógica para crear nuevo cliente
  };

  return (
    <div className="admin-content-section">
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
          <Plus size={16} />
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
                <td className="admin-client-actions">
                  <button
                    className="admin-action-button view"
                    onClick={() => handleViewClient(client.id)}
                    title="Ver detalles"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="admin-action-button edit"
                    onClick={() => handleEditClient(client.id)}
                    title="Editar cliente"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="admin-action-button delete"
                    onClick={() => handleDeleteClient(client.id)}
                    title="Eliminar cliente"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminClients;
