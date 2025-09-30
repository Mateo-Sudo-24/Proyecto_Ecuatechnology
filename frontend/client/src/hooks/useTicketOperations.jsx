// frontend/client/src/hooks/useTicketOperations.jsx
import { useState } from "react";

/**
 * Hook unificado con todas las operaciones de tickets
 * Contiene las 3 operaciones principales: diagnóstico, proforma y actualización de estado
 */
const useTicketOperations = () => {
  // Estados de loading separados para cada operación
  const [loading, setLoading] = useState({
    diagnosis: false,
    proforma: false,
    status: false
  });

  // Estados de error separados para cada operación
  const [error, setError] = useState({
    diagnosis: null,
    proforma: null,
    status: null
  });

  // Función helper para obtener el token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // 1. Agregar diagnóstico a un ticket
  const updateDiagnosis = async (ticketId, diagnostico) => {
    // Validación simple campo vacio
    if (!diagnostico || diagnostico.trim() === '') {
      throw new Error('El diagnóstico no puede estar vacío');
    }

    setLoading(prev => ({ ...prev, diagnosis: true }));
    setError(prev => ({ ...prev, diagnosis: null }));

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const res = await fetch(`http://localhost:3000/api/admin/tickets/${ticketId}/diagnose`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagnostico })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al agregar diagnóstico');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      const errorMessage = err.message;
      setError(prev => ({ ...prev, diagnosis: errorMessage }));
      throw new Error(errorMessage);
    } finally {
      setLoading(prev => ({ ...prev, diagnosis: false }));
    }
  };

  // 2. Crear proforma para un ticket
  const createProforma = async (ticketId, proformaDetalles, precioTotal) => {
    // Validaciones
    if (!proformaDetalles || proformaDetalles.trim() === '') {
      throw new Error('Los detalles de la proforma no pueden estar vacíos');
    }

    if (!precioTotal || precioTotal <= 0) {
      throw new Error('El precio total debe ser mayor a 0');
    }

    setLoading(prev => ({ ...prev, proforma: true }));
    setError(prev => ({ ...prev, proforma: null }));

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const res = await fetch(`http://localhost:3000/api/admin/tickets/${ticketId}/proforma`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proformaDetalles,
          precioTotal: parseFloat(precioTotal)
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al crear proforma');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      const errorMessage = err.message;
      setError(prev => ({ ...prev, proforma: errorMessage }));
      throw new Error(errorMessage);
    } finally {
      setLoading(prev => ({ ...prev, proforma: false }));
    }
  };

  // 3. Actualizar estado de un ticket
  const updateStatus = async (ticketId, nuevoEstado) => {
    // Validación
    if (!nuevoEstado || nuevoEstado.trim() === '') {
      throw new Error('El estado no puede estar vacío');
    }

    setLoading(prev => ({ ...prev, status: true }));
    setError(prev => ({ ...prev, status: null }));

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const res = await fetch(`http://localhost:3000/api/admin/tickets/${ticketId}/status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nuevoEstado })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar estado');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      const errorMessage = err.message;
      setError(prev => ({ ...prev, status: errorMessage }));
      throw new Error(errorMessage);
    } finally {
      setLoading(prev => ({ ...prev, status: false }));
    }
  };

  return {
    // Funciones de operaciones
    updateDiagnosis,
    createProforma,
    updateStatus,

    // Estados
    loading,
    error
  };
};

export default useTicketOperations;