import React, { useState } from 'react';
import '../../styles/AdminManagement.css';

const AdminManagement = ({ onBack }) => {
  // Estado para la lista de administradores
  const [administradores, setAdministradores] = useState([
    {
      id: 1,
      nombre: "Administrador Principal",
      telefono: "+593 99 123 4567",
      email: "admin@ecuatechnology.com",
      cargo: "Administrador del Sistema",
      estado: "activo",
      fechaCreacion: "2024-01-01"
    },
    {
      id: 2,
      nombre: "María Supervisora",
      telefono: "+593 98 765 4321",
      email: "maria.supervisor@ecuatechnology.com",
      cargo: "Supervisora de Soporte",
      estado: "activo",
      fechaCreacion: "2025-02-15"
    }
  ]);

  // Estado para el modal de crear/editar administrador
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    cargo: '',
    contraseña: '',
    estado: 'activo'
  });

  // Función para abrir modal de creación
  const handleCreateAdmin = () => {
    setEditingAdmin(null);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      cargo: '',
      contraseña: '',
      estado: 'activo'
    });
    setIsModalOpen(true);
  };

  // Función para abrir modal de edición
  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      nombre: admin.nombre,
      email: admin.email,
      telefono: admin.telefono,
      cargo: admin.cargo,
      contraseña: '',
      estado: admin.estado
    });
    setIsModalOpen(true);
  };

  // Función para eliminar administrador
  const handleDeleteAdmin = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este administrador?')) {
      setAdministradores(administradores.filter(admin => admin.id !== id));
    }
  };

  // Función para guardar administrador
  const handleSaveAdmin = (e) => {
    e.preventDefault();
    
    if (editingAdmin) {
      // Editar administrador existente
      setAdministradores(administradores.map(admin => 
        admin.id === editingAdmin.id 
          ? { ...admin, ...formData }
          : admin
      ));
    } else {
      // Crear nuevo administrador
      const newAdmin = {
        id: Date.now(), // ID temporal
        ...formData,
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      setAdministradores([...administradores, newAdmin]);
    }
    
    setIsModalOpen(false);
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      cargo: '',
      estado: 'activo'
    });
  };

  // Función para cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      cargo: '',
      contraseña: '',
      estado: 'activo'
    });
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-management">
      {/* Encabezado simplificado */}
      <div className="admin-management-header">
        <button 
          className="admin-back-button"
          onClick={onBack}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver al Perfil
        </button>
        
        <h1 className="admin-management-title">Gestión de Administradores</h1>
        
        <button 
          className="admin-create-button"
          onClick={handleCreateAdmin}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Crear Administrador
        </button>
      </div>

      {/* Lista de Administradores */}
      <div className="admin-management-content">
        <h2 className="admin-list-title">Lista de Administradores</h2>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Administrador</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Estado</th>
                <th>Fecha Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {administradores.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <div className="admin-info">
                      <div className="admin-name">{admin.nombre}</div>
                      <div className="admin-phone">{admin.telefono}</div>
                    </div>
                  </td>
                  <td>{admin.email}</td>
                  <td>{admin.cargo}</td>
                  <td>
                    <span className={`admin-status admin-status-${admin.estado}`}>
                      {admin.estado}
                    </span>
                  </td>
                  <td>{admin.fechaCreacion}</td>
                  <td>
                    <div className="admin-actions">
                      <button 
                        className="admin-action-button admin-edit-button"
                        onClick={() => handleEditAdmin(admin)}
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                          <path d="m15 5 4 4"/>
                        </svg>
                      </button>
                      <button 
                        className="admin-action-button admin-delete-button"
                        onClick={() => handleDeleteAdmin(admin.id)}
                        title="Eliminar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18"/>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Crear/Editar Administrador */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingAdmin ? 'Editar Administrador' : 'Crear Nuevo Administrador'}
              </h3>
              <button 
                className="admin-modal-close"
                onClick={handleCloseModal}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveAdmin} className="admin-modal-form">
              <div className="admin-form-fields">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre completo"
                  required
                  className="admin-form-input"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="admin-form-input"
                />

                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Teléfono"
                  required
                  className="admin-form-input"
                />

                <input
                  type="text"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  placeholder="Cargo"
                  required
                  className="admin-form-input"
                />

                <input
                  type="password"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleInputChange}
                  placeholder="Contraseña temporal"
                  required
                  className="admin-form-input"
                />

                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                  className="admin-form-select"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>

              <div className="admin-modal-actions">
                <button 
                  type="button"
                  className="admin-cancel-button"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="admin-save-button"
                >
                  {editingAdmin ? 'Actualizar Administrador' : 'Crear Administrador'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
