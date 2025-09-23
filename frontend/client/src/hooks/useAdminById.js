import { useState, useEffect } from 'react';
import { fetchDataBackend } from '../helpers/fetchWithToast';

const useAdminById = (adminId) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAdminById = async (id) => {
    if (!id) {
      setAdmin(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Consumir el endpoint GET /api/admin/:id
      const data = await fetchDataBackend(`/admin/${id}`, null, 'GET');
      setAdmin(data);
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener admin por ID:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminId) {
      getAdminById(adminId);
    }
  }, [adminId]);

  return {
    admin,
    loading,
    error,
    refetch: (id) => getAdminById(id)
  };
};

export default useAdminById;