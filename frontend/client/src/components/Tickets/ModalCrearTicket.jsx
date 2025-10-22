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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl leading-none"
          onClick={onClose}
        >
          ×
        </button>
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#B8860B] p-3 rounded-lg">
            <svg
              className="w-6 h-6 text-background"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center text-[#B8860B] mb-2">Nuevo Ticket</h2>
            <p className="text-center text-gray-600 mb-6">
              Completa la información requerida
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              placeholder="Ej: Error en el sistema de pagos"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all"
              required
            />
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              placeholder="Describe el problema detalladamente..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all resize-vertical min-h-[100px]"
              rows={4}
              required
            />
          </div>

          {/* Prioridad */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Prioridad</label>
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-lg">⚠️</span>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-neutral hover:text-[#B8860B] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#8B6914] transition-colors disabled:opacity-50"
            >
              {loading ? "Creando..." : "Crear Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearTicket;
