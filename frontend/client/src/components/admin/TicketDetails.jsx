import React, { useState } from 'react';
import { Pencil, Play, XSquare, UserPlus } from 'lucide-react';
import '../../styles/TicketDetails.css';

const TicketDetails = ({ ticket, onBack }) => {
  const [currentTicket, setCurrentTicket] = useState(ticket);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Juan Pérez",
      timestamp: "2024-03-15 10:30",
      content: "El error aparece cuando intento generar una factura con más de 10 productos"
    },
    {
      id: 2,
      author: "Soporte Técnico",
      timestamp: "2024-03-15 11:15",
      content: "Hemos identificado el problema. Trabajando en la solución."
    }
  ]);
  const [newComment, setNewComment] = useState("");

  // Función para marcar ticket en progreso
  const handleMarkInProgress = () => {
    setCurrentTicket(prev => ({
      ...prev,
      status: 'en progreso'
    }));
    console.log('Ticket marcado en progreso:', currentTicket?.id);
    // Aquí implementarías la llamada al API
  };

  // Función para cerrar ticket
  const handleCloseTicket = () => {
    setCurrentTicket(prev => ({
      ...prev,
      status: 'cerrado'
    }));
    console.log('Ticket cerrado:', currentTicket?.id);
    // Aquí implementarías la llamada al API
  };

  // Función para reasignar ticket
  const handleReassignTicket = () => {
    setShowReassignModal(true);
  };

  // Función para confirmar reasignación
  const handleConfirmReassign = (newAssignee) => {
    setCurrentTicket(prev => ({
      ...prev,
      assignedTo: newAssignee
    }));
    setShowReassignModal(false);
    console.log('Ticket reasignado a:', newAssignee);
    // Aquí implementarías la llamada al API
  };

  // Función para agregar comentario
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Admin Usuario",
        timestamp: new Date().toLocaleString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        content: newComment.trim()
      };
      setComments(prev => [...prev, comment]);
      setNewComment("");
      
      // Guardar en localStorage
      localStorage.setItem(`ticket_${currentTicket?.id}_comments`, JSON.stringify([...comments, comment]));
      
      console.log('Comentario agregado:', comment);
    }
  };
  return (
    <div className="ticket-details-container">
      <div className="details-layout">
        <div className="info-section">
          <div className="info-header">
            <h2>Información del Ticket</h2>
            <button className="edit-button">
              <Pencil size={16} />
              Editar
            </button>
          </div>
          <div className="info-content">
            <div className="info-left">
              <div className="info-field">
                <label>Título</label>
                <p>{ticket?.title || "Error en sistema de facturación"}</p>
              </div>
              <div className="info-field">
                <label>Descripción</label>
                <p>{ticket?.description || "El sistema no permite generar facturas desde el módulo de ventas"}</p>
              </div>
            </div>
            <div className="info-right">
              <div className="status-field">
                <label>Estado</label>
                <span className={`status-badge ${currentTicket?.status?.replace(' ', '-') || 'cerrado'}`}>
                  {currentTicket?.status || 'cerrado'}
                </span>
              </div>
              <div className="status-field">
                <label>Prioridad</label>
                <span className={`priority-badge ${currentTicket?.priority || 'alta'}`}>
                  {currentTicket?.priority || 'alta'}
                </span>
              </div>
            </div>
          </div>
          <div className="info-details">
            <div className="details-row">
              <div className="details-field">
                <label>Cliente</label>
                <p>Juan Pérez - Tech Solutions S.A.</p>
              </div>
              <div className="details-field">
                <label>Asignado a</label>
                <p>{currentTicket?.assignedTo || 'Soporte Técnico'}</p>
              </div>
              <div className="details-field">
                <label>Categoría</label>
                <p>Sistema</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Comentarios */}
        <div className="comments-section">
          <div className="comments-header">
            <h3>Historial de Comentarios</h3>
          </div>
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-timestamp">{comment.timestamp}</span>
                  </div>
                  <p className="comment-text">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="add-comment-section">
            <h3>Agregar Comentario</h3>
            <form onSubmit={handleAddComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribir comentario..."
                className="comment-textarea"
                rows="4"
                required
              />
              <button type="submit" className="add-comment-button">
                Agregar Comentario
              </button>
            </form>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="details-card">
            <h3>Detalles</h3>
            <div className="details-list">
              <div className="detail-item">
                <label>Fecha creación</label>
                <p>2024-03-15</p>
              </div>
              <div className="detail-item">
                <label>Última actualización</label>
                <p>2024-03-15</p>
              </div>
              <div className="detail-item">
                <label>Comentarios</label>
                <p>2</p>
              </div>
            </div>
          </div>

          <div className="actions-card">
            <h3>Acciones Rápidas</h3>
            <div className="actions-list">
              <button className="quick-action-button" onClick={() => handleMarkInProgress()}>
                Marcar en Progreso
              </button>
              <button className="quick-action-button" onClick={() => handleCloseTicket()}>
                Cerrar Ticket
              </button>
              <button className="quick-action-button" onClick={() => handleReassignTicket()}>
                Reasignar Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Reasignación */}
      {showReassignModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Reasignar Ticket</h2>
            </div>
            <div className="modal-body">
              <p className="modal-description">
                Selecciona el área a la que deseas reasignar este ticket:
              </p>
              <div className="assignee-options">
                <button 
                  className="assignee-option"
                  onClick={() => handleConfirmReassign('Soporte Técnico')}
                >
                  Soporte Técnico
                </button>
                <button 
                  className="assignee-option"
                  onClick={() => handleConfirmReassign('Ventas')}
                >
                  Ventas
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="modal-cancel-button" 
                onClick={() => setShowReassignModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
