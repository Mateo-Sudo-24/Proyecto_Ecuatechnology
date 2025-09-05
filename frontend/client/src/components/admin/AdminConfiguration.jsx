import React, { useState } from 'react';
import { Save, Key, Download, Database, Check } from 'lucide-react';
import '../../styles/AdminConfiguration.css';

const AdminConfiguration = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Ecuatechnology S.A.',
    phone: '+593 99 123 4567',
    email: 'admin@ecuatechnology.com',
    address: 'Quito, Ecuador'
  });


  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    automaticBackup: true,
    scheduledMaintenance: false
  });

  const handleCompanyInfoChange = (field, value) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleNotificationChange = (field) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveConfiguration = () => {
    // Guardar configuración en localStorage
    const config = {
      companyInfo,
      notifications
    };
    localStorage.setItem('admin_configuration', JSON.stringify(config));
    console.log('Configuración guardada:', config);
    alert('Configuración guardada exitosamente');
  };

  const handleChangePassword = () => {
    console.log('Cambiar contraseña');
    // Aquí implementarías la lógica para cambiar contraseña
  };

  const handleExportData = () => {
    console.log('Exportar datos');
    // Aquí implementarías la lógica para exportar datos
  };

  const handleManualBackup = () => {
    console.log('Realizar backup manual');
    // Aquí implementarías la lógica para backup manual
  };

  return (
    <div className="admin-content-section">
      <div className="admin-configuration-section">
      <div className="configuration-header">
        <h1>Configuración</h1>
      </div>

      <div className="configuration-content">
        {/* Información de la Empresa */}
        <div className="configuration-card">
          <h2>Información de la Empresa</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Nombre de la Empresa</label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Teléfono de Contacto</label>
              <input
                type="tel"
                value={companyInfo.phone}
                onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email de Contacto</label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                value={companyInfo.address}
                onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>


        {/* Notificaciones y Automatización */}
        <div className="configuration-card">
          <h2>Notificaciones y Automatización</h2>
          <div className="notification-options">
            <div className="notification-item">
              <div className="notification-info">
                <h3>Notificaciones por Email</h3>
                <p>Recibir notificaciones de tickets y cambios importantes</p>
              </div>
              <button 
                className={`custom-checkbox ${notifications.emailNotifications ? 'checked' : ''}`}
                onClick={() => handleNotificationChange('emailNotifications')}
              >
                {notifications.emailNotifications && <Check size={16} />}
              </button>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <h3>Backup Automático</h3>
                <p>Realizar respaldo automático diario de los datos</p>
              </div>
              <button 
                className={`custom-checkbox ${notifications.automaticBackup ? 'checked' : ''}`}
                onClick={() => handleNotificationChange('automaticBackup')}
              >
                {notifications.automaticBackup && <Check size={16} />}
              </button>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <h3>Mantenimiento Programado</h3>
                <p>Activar ventana de mantenimiento los domingos a las 2:00 AM</p>
              </div>
              <button 
                className={`custom-checkbox ${notifications.scheduledMaintenance ? 'checked' : ''}`}
                onClick={() => handleNotificationChange('scheduledMaintenance')}
              >
                {notifications.scheduledMaintenance && <Check size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Seguridad y Datos */}
        <div className="configuration-card">
          <h2>Seguridad y Datos</h2>
          <div className="security-actions">
            <button className="security-button primary" onClick={handleChangePassword}>
              <Key size={20} />
              Cambiar Contraseña
            </button>
            <button className="security-button secondary" onClick={handleExportData}>
              <Download size={20} />
              Exportar Datos
            </button>
            <button className="security-button secondary" onClick={handleManualBackup}>
              <Database size={20} />
              Realizar Backup Manual
            </button>
          </div>
        </div>

        {/* Botón de Guardar */}
        <div className="save-section">
          <button className="save-button" onClick={handleSaveConfiguration}>
            <Save size={20} />
            Guardar Configuración
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminConfiguration;
