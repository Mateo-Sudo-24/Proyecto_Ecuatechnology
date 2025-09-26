// src/components/tickets/TicketInvoice.jsx
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function TicketInvoice({ ticketId }) {
  const { fetchDataBackend } = useFetch();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setMessage("");
    setPdfUrl(null);

    try {
      const data = await fetchDataBackend(`/tickets/${ticketId}/invoice`);
      setPdfUrl(data.pdfUrl);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-md font-bold mb-3">Factura</h3>
      <button
        onClick={handleDownload}
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        {loading ? "Cargando..." : "Ver / Descargar PDF"}
      </button>

      {pdfUrl && (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-blue-600 font-medium underline"
        >
          Abrir factura en nueva pestaña
        </a>
      )}

      {message && <p className="text-sm text-neutral mt-2">{message}</p>}
    </div>
  );
}
