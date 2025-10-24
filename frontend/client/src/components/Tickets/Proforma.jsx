// src/components/tickets/Proforma.jsx
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

export default function Proforma({ ticketId, estadoActual }) {
  const { fetchDataBackend } = useFetch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [estado, setEstado] = useState(estadoActual);

  const handleAction = async (action) => {
    setLoading(true);
    setMessage("");

    try {
      const data = await fetchDataBackend("/tickets/proforma", { ticketId, action }, "POST");
      setEstado(data.ticket.estado);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm md:max-w-md mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-sm md:text-md font-bold mb-3">Proforma</h3>
      <p className="text-xs md:text-sm mb-3">Estado actual: <span className="font-medium">{estado}</span></p>

      {estado === "Esperando Aprobación" ? (
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <button
            onClick={() => handleAction("aprobar")}
            disabled={loading}
            className="bg-green-600 text-white py-2 px-3 md:px-4 rounded-md hover:bg-green-700 transition-colors font-medium text-xs md:text-sm"
          >
            Aprobar
          </button>
          <button
            onClick={() => handleAction("rechazar")}
            disabled={loading}
            className="bg-red-600 text-white py-2 px-3 md:px-4 rounded-md hover:bg-red-700 transition-colors font-medium text-xs md:text-sm"
          >
            Rechazar
          </button>
        </div>
      ) : (
        <p className="text-xs md:text-sm font-medium mt-2">
          La proforma ya fue: <span className="capitalize">{estado}</span>
        </p>
      )}

      {message && <p className="text-xs md:text-sm text-neutral mt-2">{message}</p>}
    </div>
  );
}
