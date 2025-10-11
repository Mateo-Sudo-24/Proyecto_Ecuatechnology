// src/hooks/useFetchAdminTickets.jsx
import { useState, useEffect, useCallback } from "react";

const useFetchAdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtén el token de admin desde localStorage (misma clave que usa storeAuth)
   const token = localStorage.getItem("token"); // usa la misma clave que storeAuth

   const fetchTickets = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3000/api/admin/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
 
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Error al obtener tickets de admin");
        }
 
        const data = await res.json();
        setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchTickets();
    } else {
      setError("No hay token de admin válido");
    }
  }, [fetchTickets, token]);

  return { tickets, loading, error, fetchTickets };
};

export default useFetchAdminTickets;
