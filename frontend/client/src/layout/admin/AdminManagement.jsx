import React, { useState } from 'react';
import { ArrowLeft, Plus, Pencil, Trash, X } from 'lucide-react';
import '../../styles/AdminManagement.css';

const AdminManagement = ({ onBack }) => {
  // Estado para la lista de administradores
  const [administradores, setAdministradores] = useState([
    {
      id: 1,
      nombre: "David Ordoñez",
      telefono: "+593 99 123 4567",
      email: "admin@ecuatechnology.com",
      cargo: "Administrador del Sistema",
      estado: "activo",
      fechaCreacion: "2024-01-01"
    },
    {
      id: 2,
      nombre: "María",
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  // Función para ver detalles del administrador
  const handleViewAdmin = (admin) => {
    setEditingAdmin(admin);
    // Aquí puedes implementar la lógica para mostrar los detalles
    console.log('Ver detalles del administrador:', admin);
  };

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
    const admin = administradores.find(a => a.id === id);
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Aquí implementarías la lógica para eliminar el administrador en el backend
    setAdministradores(administradores.filter(admin => admin.id !== adminToDelete.id));
    setShowDeleteModal(false);
    setAdminToDelete(null);
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
          <ArrowLeft size={16} />
          Volver al perfil
        </button>
        
        <h1 className="admin-management-title">Gestión de Administradores</h1>
        
        <button 
          className="admin-create-button"
          onClick={handleCreateAdmin}
        >
          <Plus size={16} />
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
                <th>Fecha de creación</th>
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
                    <div className="ticket-actions">
                      <button 
                        className="action-button edit"
                        onClick={() => handleEditAdmin(admin)}
                        title="Editar administrador"
                      >
                        <Pencil size={20} />
                      </button>
                      <button 
                        className="action-button delete"
                        onClick={() => handleDeleteAdmin(admin.id)}
                        title="Eliminar administrador"
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
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && adminToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirmar Eliminación</h2>
            </div>
            <div className="modal-form">
              <p className="delete-message">
                ¿Estás seguro de que deseas eliminar al administrador <strong>{adminToDelete.nombre}</strong>?
                <br />
                <span className="delete-warning">Esta acción no se puede deshacer.</span>
              </p>
              <div className="modal-actions">
                <button type="button" className="admin-cancel-button" onClick={() => setShowDeleteModal(false)}>
                  Cancelar
                </button>
                <button type="button" className="admin-delete-confirm-button" onClick={confirmDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Crear/Editar Administrador */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingAdmin ? 'Editar administrador' : 'Crear nuevo administrador'}
              </h3>
              <button 
                className="admin-modal-close"
                onClick={handleCloseModal}
              >
                <X size={20} />
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
