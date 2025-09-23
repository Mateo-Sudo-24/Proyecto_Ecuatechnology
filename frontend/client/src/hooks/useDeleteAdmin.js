import { useState } from 'react';
import useFetch from './useFetch';

const useDeleteAdmin = () => {
  const { fetchDataBackend } = useFetch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteAdmin = async (adminId) => {
    setLoading(true);
    setError(null);

    try {
      // Consumir el endpoint DELETE /api/admin/:id
      await fetchDataBackend(`/admin/${adminId}`, null, 'DELETE');
      return true; // Éxito
    } catch (err) {
      setError(err.message);
      console.error('Error al eliminar admin:', err);
      return false; // Error
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteAdmin,
    loading,
    error
  };
};

export default useDeleteAdmin;