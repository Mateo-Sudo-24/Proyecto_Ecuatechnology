import React, { useState } from 'react';
import { Play, XSquare, Plus, FileText, Download, Search, Clock, CheckCircle } from 'lucide-react';
import useTicketOperations from '../../hooks/useTicketOperations';

const TicketDetails = ({ ticket, onBack }) => {
  const [currentTicket, setCurrentTicket] = useState(ticket);
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

  // Función para marcar ticket en diagnóstico
  const handleMarkDiagnosis = async () => {
    try {
      await updateStatus(currentTicket.id, 'En Diagnóstico');
      setCurrentTicket(prev => ({
        ...prev,
        estado: 'En Diagnóstico'
      }));
      alert('Ticket marcado en diagnóstico exitosamente');
    } catch (err) {
      alert('Error al marcar ticket en diagnóstico: ' + err.message);
    }
  };

  // Función para marcar ticket esperando aprobación
  const handleMarkWaitingApproval = async () => {
    try {
      await updateStatus(currentTicket.id, 'Esperando Aprobación');
      setCurrentTicket(prev => ({
        ...prev,
        estado: 'Esperando Aprobación'
      }));
      alert('Ticket marcado esperando aprobación exitosamente');
    } catch (err) {
      alert('Error al marcar ticket esperando aprobación: ' + err.message);
    }
  };

  // Función para marcar ticket en reparación
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

  // Función para marcar ticket completado
  const handleMarkCompleted = async () => {
    try {
      await updateStatus(currentTicket.id, 'Completado');
      setCurrentTicket(prev => ({
        ...prev,
        estado: 'Completado'
      }));
      alert('Ticket marcado como completado exitosamente');
    } catch (err) {
      alert('Error al marcar ticket como completado: ' + err.message);
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
    <div className="space-y-8">
      {/* Información Principal del Ticket */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-neutral">Información del Ticket</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Título</label>
              <p className="text-neutral font-medium">{ticket?.descripcion || "Sin título"}</p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Estado</label>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                getStatusClass(currentTicket?.estado || 'Ingresado') === 'ingresado' ? 'bg-blue-100 text-blue-800' :
                getStatusClass(currentTicket?.estado || 'Ingresado') === 'en-diagnostico' ? 'bg-yellow-100 text-yellow-800' :
                getStatusClass(currentTicket?.estado || 'Ingresado') === 'esperando-aprobacion' ? 'bg-orange-100 text-orange-800' :
                getStatusClass(currentTicket?.estado || 'Ingresado') === 'en-reparacion' ? 'bg-purple-100 text-purple-800' :
                getStatusClass(currentTicket?.estado || 'Ingresado') === 'completado' ? 'bg-green-100 text-green-800' :
                getStatusClass(currentTicket?.estado || 'Ingresado') === 'cerrado' ? 'bg-gray-100 text-gray-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {currentTicket?.estado || 'Ingresado'}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">ID del Ticket</label>
              <p className="text-primary font-bold text-lg">#{ticket?.id || 'N/A'}</p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Fecha de Creación</label>
              <p className="text-neutral">{ticket ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">Cliente</label>
            <p className="text-neutral">{ticket?.cliente?.nombre || 'N/A'} - {ticket?.cliente?.email || 'N/A'}</p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">ID del Cliente</label>
            <p className="text-neutral">{ticket?.clienteId || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas - Debajo de la información principal */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            className="flex items-center gap-2 px-4 py-3 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-all disabled:opacity-50"
            onClick={() => handleMarkDiagnosis()}
            disabled={loading.status}
          >
            <Search size={16} />
            {loading.status ? 'Procesando...' : 'Marcar en Diagnóstico'}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-3 bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-all disabled:opacity-50"
            onClick={() => handleMarkWaitingApproval()}
            disabled={loading.status}
          >
            <Clock size={16} />
            {loading.status ? 'Procesando...' : 'Esperando Aprobación'}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-3 bg-[#B8860B] text-white rounded-md hover:bg-[#8B6914] transition-all disabled:opacity-50"
            onClick={() => handleMarkInProgress()}
            disabled={loading.status}
          >
            <Play size={16} />
            {loading.status ? 'Procesando...' : 'Marcar en Reparación'}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-3 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-all disabled:opacity-50"
            onClick={() => handleMarkCompleted()}
            disabled={loading.status}
          >
            <CheckCircle size={16} />
            {loading.status ? 'Procesando...' : 'Marcar Completado'}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-3 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-all disabled:opacity-50"
            onClick={() => handleCloseTicket()}
            disabled={loading.status}
          >
            <XSquare size={16} />
            {loading.status ? 'Procesando...' : 'Cerrar Ticket'}
          </button>
        </div>
      </div>

      {/* Sección de Operaciones - Debajo de las acciones rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral mb-4">Operaciones del Ticket</h3>
          <div className="space-y-3">
            <button
              className="flex items-center gap-2 w-full px-4 py-3 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-all disabled:opacity-50"
              onClick={handleShowDiagnosisModal}
              disabled={loading.diagnosis}
            >
              <Plus size={16} />
              {loading.diagnosis ? 'Procesando...' : 'Agregar Diagnóstico'}
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-3 bg-[#B8860B] text-white rounded-md hover:bg-[#8B6914] transition-all disabled:opacity-50"
              onClick={handleShowProformaModal}
              disabled={loading.proforma}
            >
              <FileText size={16} />
              {loading.proforma ? 'Procesando...' : 'Crear Proforma'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral mb-4">Facturación</h3>
          <div className="space-y-3">
            <button
              className="flex items-center gap-2 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all"
              onClick={handleDownloadXML}
            >
              <Download size={16} />
              Descargar XML
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all"
              onClick={handleDownloadPDF}
            >
              <Download size={16} />
              Descargar PDF
            </button>
          </div>
        </div>
      </div>



      {/* Modal de Diagnóstico */}
      {showDiagnosisModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral m-0">Agregar Diagnóstico</h2>
            </div>
            <form onSubmit={handleAddDiagnosis}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Diagnóstico del Problema</label>
                  <textarea
                    value={diagnosisText}
                    onChange={(e) => setDiagnosisText(e.target.value)}
                    placeholder="Describe el diagnóstico del problema..."
                    className="w-full p-4 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 resize-vertical min-h-[120px]"
                    rows="4"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all font-medium disabled:opacity-50"
                  onClick={() => setShowDiagnosisModal(false)}
                  disabled={loading.diagnosis}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#B8860B] text-white rounded-md hover:bg-[#8B6914] transition-all font-medium disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral m-0">Crear Proforma</h2>
            </div>
            <form onSubmit={handleCreateProforma}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Detalles de la Proforma</label>
                  <textarea
                    value={proformaData.detalles}
                    onChange={(e) => setProformaData({...proformaData, detalles: e.target.value})}
                    placeholder="Describe los servicios/partes incluidos..."
                    className="w-full p-4 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 resize-vertical min-h-[100px]"
                    rows="3"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Precio Total ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={proformaData.precio}
                    onChange={(e) => setProformaData({...proformaData, precio: e.target.value})}
                    placeholder="0.00"
                    className="w-full p-4 border border-neutral-200 rounded-md text-sm text-neutral bg-background transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all font-medium disabled:opacity-50"
                  onClick={() => setShowProformaModal(false)}
                  disabled={loading.proforma}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#B8860B] text-white rounded-md hover:bg-[#8B6914] transition-all font-medium disabled:opacity-50"
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
