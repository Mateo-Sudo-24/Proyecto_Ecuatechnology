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
    <div className="modal-overlay">
      <div className="modal-content max-w-lg">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary p-3 rounded-lg">
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
            <h2 className="text-2xl font-bold text-neutral">Nuevo Ticket</h2>
            <p className="text-sm text-gray-500">
              Completa la información requerida
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div className="form-group">
            <label className="form-label">Título</label>
            <input
              type="text"
              placeholder="Ej: Error en el sistema de pagos"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea
              placeholder="Describe el problema detalladamente..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="form-textarea"
              rows={4}
              required
            />
          </div>

          {/* Prioridad */}
          <div className="form-group">
            <label className="form-label">Prioridad</label>
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className="form-select"
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
              className="flex-1 px-4 py-2 text-neutral hover:text-primary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
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
