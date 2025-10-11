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
    <div className="fixed inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 transform animate-in zoom-in duration-300 border border-gray-100">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
            <svg
              className="w-6 h-6 text-white"
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
            <h2 className="text-2xl font-bold text-gray-800">Nuevo Ticket</h2>
            <p className="text-sm text-gray-500">
              Completa la información requerida
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              placeholder="Ej: Error en el sistema de pagos"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border-2 border-gray-200 p-3 w-full rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm bg-white shadow-sm"
              required
            />
          </div>

          {/* Descripción */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              placeholder="Describe el problema detalladamente..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border-2 border-gray-200 p-3 w-full rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm resize-none bg-white shadow-sm"
              rows={4}
              required
            />
          </div>

          {/* Prioridad */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prioridad
            </label>
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className="border-2 border-gray-200 p-3 w-full rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm cursor-pointer bg-white shadow-sm appearance-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.25rem",
              }}
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
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all hover:border-gray-400 hover:shadow-md active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creando...
                </span>
              ) : (
                "✓ Crear Ticket"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearTicket;
