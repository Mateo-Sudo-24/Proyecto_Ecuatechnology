// src/components/Tickets/ProformaModal.jsx
import { FileDown, X } from "lucide-react";

const ProformaModal = ({
  isOpen,
  onClose,
  selectedTicket,
  handleProformaAction,
  handleDownloadProforma,
}) => {
  if (!isOpen || !selectedTicket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm md:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Proforma de Servicio</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
        <div className="p-4 md:p-6">
          {/* Header de la proforma */}
          <div className="text-center mb-4 md:mb-6">
            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">ECUATECHNOLOGY S.A.</h4>
            <p className="text-base md:text-lg text-gray-700">PROFORMA DE SERVICIO</p>
            <div className="w-full h-px bg-gray-300 mt-4"></div>
          </div>

          {/* Información de la empresa */}
          <div className="mb-4 md:mb-6">
            <p className="text-xs md:text-sm text-gray-600 mb-1">Dirección: Quito, Ecuador</p>
            <p className="text-xs md:text-sm text-gray-600 mb-1">Teléfono: +593 962590039</p>
            <p className="text-xs md:text-sm text-gray-600">Email: contacto@ecuatecnology.com</p>
          </div>

          {/* Información del ticket y cliente */}
          <div className="mb-4 md:mb-6">
            <h5 className="font-bold text-gray-900 mb-3 text-sm md:text-base">INFORMACIÓN DEL SERVICIO</h5>
            <div className="space-y-2">
              <p className="text-xs md:text-sm"><span className="font-medium">Número de Ticket:</span> #{selectedTicket.id}</p>
              <p className="text-xs md:text-sm"><span className="font-medium">Fecha de solicitud:</span> {new Date(selectedTicket.createdAt).toLocaleDateString('es-ES')}</p>
              <p className="text-xs md:text-sm"><span className="font-medium">Estado:</span> {selectedTicket.estado}</p>
            </div>
          </div>

          {/* Detalles de la proforma */}
          <div className="mb-4 md:mb-6">
            <h5 className="font-bold text-gray-900 mb-3 text-sm md:text-base">DETALLES DEL SERVICIO</h5>
            <div className="text-gray-700 whitespace-pre-line text-xs md:text-sm">
              {selectedTicket.proformaDetalles}
            </div>
          </div>

          {/* Diagnóstico si existe */}
          {selectedTicket.diagnostico && (
            <div className="mb-4 md:mb-6">
              <h5 className="font-bold text-gray-900 mb-3 text-sm md:text-base">DIAGNÓSTICO TÉCNICO</h5>
              <div className="text-gray-700 whitespace-pre-line text-xs md:text-sm">
                {selectedTicket.diagnostico}
              </div>
            </div>
          )}

          {/* Precio total */}
          <div className="mb-4 md:mb-6">
            <h5 className="font-bold text-gray-900 mb-3 text-sm md:text-base">PRECIO TOTAL</h5>
            <p className="text-lg md:text-xl font-bold text-[#B8860B]">${selectedTicket.precioTotal}</p>
          </div>

          {/* Información de aprobación */}
          <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
            <p className="text-xs md:text-sm text-gray-600 mb-2">
              <span className="font-medium">Estado de la proforma:</span> Pendiente de aprobación
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              Para aprobar o rechazar esta proforma, revisa los detalles y usa los botones correspondientes.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => {
                handleProformaAction(selectedTicket.id, "aprobar");
                onClose();
              }}
              className="bg-[#B8860B] text-white px-4 py-2 rounded hover:bg-[#8B6914] transition-all text-sm md:text-base"
            >
              Aprobar
            </button>
            <button
              onClick={() => {
                handleProformaAction(selectedTicket.id, "rechazar");
                onClose();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all text-sm md:text-base"
            >
              Rechazar
            </button>
            <button
              onClick={() => handleDownloadProforma(selectedTicket.id)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <FileDown className="h-4 w-4" /> Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProformaModal;