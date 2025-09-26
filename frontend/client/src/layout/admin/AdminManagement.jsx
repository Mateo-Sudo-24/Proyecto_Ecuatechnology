import React, { useState } from 'react';
import { ArrowLeft, Plus, Pencil, Trash, X } from 'lucide-react';
import '../../styles/admin.css';
import useAdmins from '../../hooks/useAdmins';
import useDeleteAdmin from '../../hooks/useDeleteAdmin';

const AdminManagement = ({ onBack }) => {
  // Hook para obtener administradores
  const { administradores, loading: adminsLoading, error: adminsError, getAdministradores } = useAdmins();

  // Hook para eliminar administradores IMPLUMTADO
  const { deleteAdmin, loading: deleteLoading } = useDeleteAdmin();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);



  // Función para eliminar administrador
  const handleDeleteAdmin = (id) => {
    const admin = administradores.find(a => a.id === id);
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (adminToDelete) {
      const success = await deleteAdmin(adminToDelete.id);
      if (success) {
        // Recargar la lista de administradores después de eliminar
        getAdministradores();
        setShowDeleteModal(false);
        setAdminToDelete(null);
      }
      // Si hay error, el hook ya maneja el estado de error
    }
  };


  return (
    <div className="admin-management">
      {/* Encabezado simplificado */}
      <div className="admin-management-header">
        <h1 className="admin-management-title">Información del Administrador</h1>
      </div>

      {/* Lista de Administradores */}
      <div className="admin-management-content">
        <h2 className="admin-list-title">Lista de Administradores</h2>

        {adminsLoading && <p>Cargando administradores...</p>}
        {adminsError && <p>Error: {adminsError}</p>}

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {administradores.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.email}</td>
                  <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="ticket-actions">
                      <button
                        className="action-button delete"
                        onClick={() => handleDeleteAdmin(admin.id)}
                        title="Eliminar administrador"
                        disabled={deleteLoading}
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
                ¿Estás seguro de que deseas eliminar al administrador con email <strong>{adminToDelete.email}</strong>?
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


    </div>
  );
};

export default AdminManagement;
