import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const useAdmins = () => {
  const { fetchDataBackend } = useFetch();
  const [administradores, setAdministradores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAdministradores = async () => {
    setLoading(true);
    setError(null);

    try {
      //Llamada al backend para el endpoint GET /api/admin
      const data = await fetchDataBackend('/admin', null, 'GET');
      setAdministradores(data); // Los datos del backend se guardan en la variable de estado data
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener administradores:', err);
    } finally {
      setLoading(false);
    }
  };

  // Llamar a getAdministradores cuando se monte el componente
  useEffect(() => {
    getAdministradores();
  }, []);

  return {
    administradores,
    loading,
    error,
    getAdministradores // Para refrescar la lista si es necesario
  };
};

export default useAdmins;