import React from 'react';

const TicketModal = ({ isOpen, onClose, title, ticket, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-peach-light rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 pb-4 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral m-0">{title}</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Título del Ticket</label>
              <input
                type="text"
                placeholder="Título del ticket"
                name="title"
                defaultValue={ticket?.title || ''}
                className="w-full p-4 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Descripción</label>
              <textarea
                placeholder="Descripción detallada del problema o solicitud"
                name="description"
                defaultValue={ticket?.description || ''}
                className="w-full p-4 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 resize-vertical min-h-[100px]"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Cliente</label>
                <select
                  name="client"
                  defaultValue={ticket?.client || ''}
                  className="w-full p-4 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                  required
                >
                  <option value="">Seleccionar cliente</option>
                  <option value="Juan Pérez">Juan Pérez - Tech Solutions S.A.</option>
                  <option value="María González">María González - Innovate Corp</option>
                  <option value="Carlos Rodríguez">Carlos Rodríguez - Digital Plus</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Prioridad</label>
                <select
                  name="priority"
                  defaultValue={ticket?.priority || 'media'}
                  className="w-full p-4 border border-gray-300 rounded-lg text-sm text-neutral bg-white transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                  required
                >
                  <option value="baja">Prioridad Baja</option>
                  <option value="media">Prioridad Media</option>
                  <option value="alta">Prioridad Alta</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Asignado a</label>
                <select
                  name="assignedTo"
                  defaultValue={ticket?.assignedTo || 'Soporte Técnico'}
                  className="w-full p-4 border border-gray-300 rounded-lg text-sm text-neutral bg-white transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                  required
                >
                  <option value="Soporte Técnico">Soporte Técnico</option>
                  <option value="Ventas">Ventas</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Categoría</label>
                <select
                  name="category"
                  defaultValue={ticket?.category || ''}
                  className="w-full p-4 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Contratos Empresariales">Contratos Empresariales</option>
                  <option value="Repuestos y Accesorios">Repuestos y Accesorios</option>
                </select>
              </div>
            </div>
            {ticket && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Estado</label>
                <select
                  name="status"
                  defaultValue={ticket.status || 'abierto'}
                  className="w-full p-4 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                  required
                >
                  <option value="abierto">Abierto</option>
                  <option value="en progreso">En progreso</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4 p-6 pt-4 border-t border-neutral-200">
            <button
              type="button"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#B8860B] text-white rounded-lg hover:bg-[#8B6914] transition-all font-medium"
            >
              {ticket ? 'Guardar Cambios' : 'Crear Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
