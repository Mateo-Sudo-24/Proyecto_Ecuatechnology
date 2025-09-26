import { useState, useEffect } from "react";
import useFetch from "./useFetch";

export const useClienteDashboard = () => {
  const { fetchDataBackend } = useFetch();
  const [data, setData] = useState({ tickets: { abiertos: 0, completados: 0, caducados: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await fetchDataBackend("/clientes/dashboard"); // usa tu useFetch
        setData(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [fetchDataBackend]);

  const semaforoColor = () => {
    const { abiertos, completados, caducados } = data.tickets;

    if (!abiertos && !completados && !caducados) {
      return { abiertos: "bg-gray-300", completados: "bg-gray-300", caducados: "bg-gray-300" };
    }

    return {
      abiertos: abiertos > 0 ? "bg-yellow-400" : "bg-gray-300",
      completados: completados > 0 ? "bg-green-500" : "bg-gray-300",
      caducados: caducados > 0 ? "bg-red-500" : "bg-gray-300",
    };
  };

  return { data, loading, error, semaforoColor: semaforoColor() };
};
