import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

const ModalCrearTicket = ({ isOpen, onClose, onTicketCreated }) => {
  const { fetchDataBackend } = useFetch();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("media"); // valor por defecto
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchDataBackend(
        "/clientes/tickets",
        { titulo, descripcion, prioridad },
        "POST"
      );
      onTicketCreated(data.ticket); // actualizar lista
      onClose();
      setTitulo("");
      setDescripcion("");
      setPrioridad("media");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Crear Ticket</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
            required
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
            required
          />
          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearTicket;
