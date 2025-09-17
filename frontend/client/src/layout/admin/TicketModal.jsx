import React from 'react';
import '../../styles/modales.css';

const TicketModal = ({ isOpen, onClose, title, ticket, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <input
                type="text"
                placeholder="Título del ticket"
                name="title"
                defaultValue={ticket?.title || ''}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Descripción detallada del problema o solicitud"
                name="description"
                defaultValue={ticket?.description || ''}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <select 
                  name="client" 
                  defaultValue={ticket?.client || ''} 
                  required
                >
                  <option value="">Seleccionar cliente</option>
                  <option value="Juan Pérez">Juan Pérez - Tech Solutions S.A.</option>
                  <option value="María González">María González - Innovate Corp</option>
                  <option value="Carlos Rodríguez">Carlos Rodríguez - Digital Plus</option>
                </select>
              </div>
              <div className="form-group">
                <select 
                  name="priority" 
                  defaultValue={ticket?.priority || 'media'}
                  required
                >
                  <option value="baja">Prioridad Baja</option>
                  <option value="media">Prioridad Media</option>
                  <option value="alta">Prioridad Alta</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <select 
                  name="assignedTo" 
                  defaultValue={ticket?.assignedTo || 'Soporte Técnico'}
                  required
                >
                  <option value="Soporte Técnico">Soporte Técnico</option>
                  <option value="Ventas">Ventas</option>
                </select>
              </div>
              <div className="form-group">
                <select 
                  name="category" 
                  defaultValue={ticket?.category || ''}
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
              <div className="form-group">
                <select 
                  name="status" 
                  defaultValue={ticket.status || 'abierto'}
                  required
                >
                  <option value="abierto">Abierto</option>
                  <option value="en progreso">En progreso</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="submit" className="submit-button">
              {ticket ? 'Guardar Cambios' : 'Crear Ticket'}
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
