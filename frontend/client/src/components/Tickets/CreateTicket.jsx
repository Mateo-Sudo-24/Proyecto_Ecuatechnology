// src/components/tickets/CreateTicket.jsx
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function CreateTicket() {
  const { fetchDataBackend } = useFetch();
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("General");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await fetchDataBackend("/tickets", { descripcion, tipo }, "POST");
      setMessage("Ticket creado con éxito.");
      setDescripcion("");
      setTipo("General");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm md:max-w-md mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-base md:text-lg font-bold mb-4">Crear Ticket</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-col">
          <label className="text-xs md:text-sm font-medium mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-xs md:text-sm"
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs md:text-sm font-medium mb-1">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-xs md:text-sm"
          >
            <option value="General">General</option>
            <option value="Urgente">Urgente</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-background py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium text-xs md:text-sm"
        >
          {loading ? "Creando..." : "Crear Ticket"}
        </button>

        {message && <p className="text-xs md:text-sm text-neutral mt-2">{message}</p>}
      </form>
    </div>
  );
}
