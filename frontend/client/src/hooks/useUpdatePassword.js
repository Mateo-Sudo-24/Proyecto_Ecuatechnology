import { useState } from 'react';
import useFetch from './useFetch';
import useAuthStore from '../context/storeAuth';

const useUpdatePassword = () => {
  const { fetchDataBackend } = useFetch();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para decodificar JWT y obtener el ID del usuario
  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (err) {
      console.error('Error decodificando token:', err);
      return null;
    }
  };

  const updatePassword = async (newPassword) => {
    console.log('Hook useUpdatePassword llamado con nueva contrasena');
    setLoading(true);
    setError(null);

    try {
      console.log('Token disponible:', !!token);

      // Obtener el ID del usuario desde el token JWT
      const adminId = getUserIdFromToken(token);
      console.log('ID del admin obtenido:', adminId);

      if (!adminId) {
        throw new Error('No se pudo obtener el ID del usuario');
      }

      console.log('Llamando al endpoint PUT /api/admin/' + adminId);
      console.log('Datos a enviar:', { password: newPassword });

      // Solo enviamos password al endpoint PUT /api/admin/:id
      await fetchDataBackend(`/admin/${adminId}`, { password: newPassword }, 'PUT');

      console.log('Endpoint respondio exitosamente');
      return true;
    } catch (err) {
      console.error('Error en updatePassword:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading, error };
};

export default useUpdatePassword;