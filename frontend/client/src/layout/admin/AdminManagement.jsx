import { useState } from 'react';
import { Trash} from 'lucide-react';
import useAdmins from '../../hooks/useAdmins';
import useDeleteAdmin from '../../hooks/useDeleteAdmin';

const AdminManagement = () => {
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
    <div className="p-8 max-w-6xl mx-auto">
      {/* Encabezado simplificado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral">Información del Administrador</h1>
      </div>

      {/* Lista de Administradores */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral mb-6">Lista de Administradores</h2>

        {adminsLoading && <p className="text-gray-600">Cargando administradores...</p>}
        {adminsError && <p className="text-red-600">Error: {adminsError}</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fecha de creación</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {administradores.map((admin) => (
                <tr key={admin.id} className="border-b border-neutral-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-neutral">{admin.id}</td>
                  <td className="py-3 px-4 text-neutral">{admin.email}</td>
                  <td className="py-3 px-4 text-neutral">{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-all disabled:opacity-50"
                      onClick={() => handleDeleteAdmin(admin.id)}
                      title="Eliminar administrador"
                      disabled={deleteLoading}
                    >
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && adminToDelete && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral m-0">Confirmar Eliminación</h2>
            </div>
            <div className="space-y-6">
              <p className="text-neutral">
                ¿Estás seguro de que deseas eliminar al administrador con email <strong className="text-primary">{adminToDelete.email}</strong>?
                <br />
                <span className="text-red-600 text-sm">Esta acción no se puede deshacer.</span>
              </p>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all font-medium"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all font-medium"
                  onClick={confirmDelete}
                >
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
