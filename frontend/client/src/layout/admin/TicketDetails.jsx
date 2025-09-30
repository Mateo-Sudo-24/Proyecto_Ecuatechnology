import React, { useState } from 'react';
import { Play, XSquare, UserPlus, Plus, FileText, Download } from 'lucide-react';
import useTicketOperations from '../../hooks/useTicketOperations';
import '../../styles/admin.css';

const TicketDetails = ({ ticket, onBack }) => {
  const [currentTicket, setCurrentTicket] = useState(ticket);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  const [showProformaModal, setShowProformaModal] = useState(false);
  const [diagnosisText, setDiagnosisText] = useState('');
  const [proformaData, setProformaData] = useState({
    detalles: '',
    precio: ''
  });

  // Usar el hook para operaciones de tickets
  const { updateDiagnosis, createProforma, updateStatus, loading, error } = useTicketOperations();

  // Función para obtener la clase CSS correcta para cada estado
  const getStatusClass = (estado) => {
    switch(estado.toLowerCase()) {
      case 'ingresado':
        return 'ingresado';
      case 'en diagnóstico':
      case 'en-diagnostico':
        return 'en-diagnostico';
      case 'esperando aprobación':
      case 'esperando-aprobacion':
        return 'esperando-aprobacion';
      case 'en reparación':
      case 'en-reparacion':
        return 'en-reparacion';
      case 'completado':
        return 'completado';
      case 'cerrado':
        return 'cerrado';
      default:
        return 'ingresado';
    }
  };

  // Función para marcar ticket en progreso
  const handleMarkInProgress = async () => {
    try {
      await updateStatus(currentTicket.id, 'En Reparación');
      setCurrentTicket(prev => ({
        ...prev,
        estado: 'En Reparación'
      }));
      alert('Ticket marcado en reparación exitosamente');
    } catch (err) {
      alert('Error al marcar ticket en reparación: ' + err.message);
    }
  };

  // Función para cerrar ticket
  const handleCloseTicket = async () => {
    try {
      await updateStatus(currentTicket.id, 'Cerrado');
      setCurrentTicket(prev => ({
        ...prev,
        estado: 'Cerrado'
      }));
      alert('Ticket cerrado exitosamente');
    } catch (err) {
      alert('Error al cerrar ticket: ' + err.message);
    }
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
  };

  // Función para mostrar modal de diagnóstico
  const handleShowDiagnosisModal = () => {
    setDiagnosisText('');
    setShowDiagnosisModal(true);
  };

  // Función para agregar diagnóstico
  const handleAddDiagnosis = async (e) => {
    e.preventDefault();
    try {
      await updateDiagnosis(currentTicket.id, diagnosisText);
      setCurrentTicket(prev => ({
        ...prev,
        estado: 'En Diagnóstico'
      }));
      setShowDiagnosisModal(false);
      alert('Diagnóstico agregado exitosamente');
    } catch (err) {
      alert('Error al agregar diagnóstico: ' + err.message);
    }
  };

  // Función para mostrar modal de proforma
  const handleShowProformaModal = () => {
    setProformaData({ detalles: '', precio: '' });
    setShowProformaModal(true);
  };

  // Función para crear proforma
  const handleCreateProforma = async (e) => {
    e.preventDefault();
    try {
      await createProforma(currentTicket.id, proformaData.detalles, proformaData.precio);
      setCurrentTicket(prev => ({
        ...prev,
        estado: 'Esperando Aprobación'
      }));
      setShowProformaModal(false);
      alert('Proforma creada exitosamente');
    } catch (err) {
      alert('Error al crear proforma: ' + err.message);
    }
  };

  // Función para descargar factura XML
  const handleDownloadXML = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/admin/tickets/${currentTicket.id}/invoice/xml`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Error al obtener XML');

      const xmlText = await response.text();
      const blob = new Blob([xmlText], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `factura_${currentTicket.id}.xml`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error al descargar XML: ' + err.message);
    }
  };

  // Función para descargar factura PDF
  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/admin/tickets/${currentTicket.id}/invoice/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Error al obtener PDF');

      const data = await response.json();
      window.open(data.pdfUrl, '_blank');
    } catch (err) {
      alert('Error al descargar PDF: ' + err.message);
    }
  };
  return (
    <div className="ticket-details-container">
      {/* Información Principal del Ticket */}
      <div className="ticket-main-info">
        <div className="info-section">
          <div className="info-header">
            <h2>Información del Ticket</h2>
          </div>
          <div className="info-content">
            <div className="info-left">
              <div className="info-field">
                <label>Título</label>
                <p>{ticket?.descripcion || "Sin título"}</p>
              </div>
              <div className="info-field">
                <label>Estado</label>
                <span className={`status-badge ${getStatusClass(currentTicket?.estado || 'Ingresado')}`}>
                  {currentTicket?.estado || 'Ingresado'}
                </span>
              </div>
            </div>
            <div className="info-right">
              <div className="status-field">
                <label>ID del Ticket</label>
                <p className="ticket-id">#{ticket?.id || 'N/A'}</p>
              </div>
              <div className="status-field">
                <label>Fecha de Creación</label>
                <p>{ticket ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="info-details">
            <div className="details-row">
              <div className="details-field">
                <label>Cliente</label>
                <p>{ticket?.cliente?.nombre || 'N/A'} - {ticket?.cliente?.email || 'N/A'}</p>
              </div>
              <div className="details-field">
                <label>ID del Cliente</label>
                <p>{ticket?.clienteId || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas - Debajo de la información principal */}
        <div className="quick-actions-section">
          <div className="actions-card">
            <h3>Acciones Rápidas</h3>
            <div className="actions-list">
              <button
                className="quick-action-button primary"
                onClick={() => handleMarkInProgress()}
                disabled={loading.status}
              >
                <Play size={16} />
                {loading.status ? 'Procesando...' : 'Marcar en Progreso'}
              </button>
              <button
                className="quick-action-button danger"
                onClick={() => handleCloseTicket()}
                disabled={loading.status}
              >
                <XSquare size={16} />
                {loading.status ? 'Procesando...' : 'Cerrar Ticket'}
              </button>
              <button
                className="quick-action-button secondary"
                onClick={() => handleReassignTicket()}
              >
                <UserPlus size={16} />
                Reasignar Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Operaciones - Debajo de las acciones rápidas */}
      <div className="ticket-operations-section">
        <div className="operations-grid">
          <div className="operations-card">
            <h3>Operaciones del Ticket</h3>
            <div className="operations-list">
              <button
                className="operation-button diagnosis"
                onClick={handleShowDiagnosisModal}
                disabled={loading.diagnosis}
              >
                <Plus size={16} />
                {loading.diagnosis ? 'Procesando...' : 'Agregar Diagnóstico'}
              </button>
              <button
                className="operation-button proforma"
                onClick={handleShowProformaModal}
                disabled={loading.proforma}
              >
                <FileText size={16} />
                {loading.proforma ? 'Procesando...' : 'Crear Proforma'}
              </button>
            </div>
          </div>

          <div className="operations-card">
            <h3>Facturación</h3>
            <div className="operations-list">
              <button
                className="operation-button download"
                onClick={handleDownloadXML}
              >
                <Download size={16} />
                Descargar XML
              </button>
              <button
                className="operation-button download"
                onClick={handleDownloadPDF}
              >
                <Download size={16} />
                Descargar PDF
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

      {/* Modal de Diagnóstico */}
      {showDiagnosisModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Agregar Diagnóstico</h2>
            </div>
            <form onSubmit={handleAddDiagnosis}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Diagnóstico del Problema</label>
                  <textarea
                    value={diagnosisText}
                    onChange={(e) => setDiagnosisText(e.target.value)}
                    placeholder="Describe el diagnóstico del problema..."
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={() => setShowDiagnosisModal(false)}
                  disabled={loading.diagnosis}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="modal-submit-button"
                  disabled={loading.diagnosis}
                >
                  {loading.diagnosis ? 'Agregando...' : 'Agregar Diagnóstico'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Proforma */}
      {showProformaModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Crear Proforma</h2>
            </div>
            <form onSubmit={handleCreateProforma}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Detalles de la Proforma</label>
                  <textarea
                    value={proformaData.detalles}
                    onChange={(e) => setProformaData({...proformaData, detalles: e.target.value})}
                    placeholder="Describe los servicios/partes incluidos..."
                    className="form-textarea"
                    rows="3"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Precio Total ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={proformaData.precio}
                    onChange={(e) => setProformaData({...proformaData, precio: e.target.value})}
                    placeholder="0.00"
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={() => setShowProformaModal(false)}
                  disabled={loading.proforma}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="modal-submit-button"
                  disabled={loading.proforma}
                >
                  {loading.proforma ? 'Creando...' : 'Crear Proforma'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
