import React, { useState } from 'react';
import { Save, Key, Download, Database, Check, Eye, EyeOff, X } from 'lucide-react';
import '../../styles/admin.css';
import useUpdatePassword from '../../hooks/useUpdatePassword';

const AdminConfiguration = () => {
  // Hooks para cambio de contraseña
  const { updatePassword, loading: passwordLoading, error: passwordError } = useUpdatePassword();

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

  // Estados para el modal de cambio de contraseña
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');

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
    console.log('Boton "Cambiar Contrasena" clickeado');
    setShowPasswordModal(true);
    setPasswordForm({ newPassword: '', confirmPassword: '' });
    setPasswordSuccess('');
  };

  const handlePasswordFormChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    console.log('Formulario enviado - handlePasswordSubmit llamado');
    e.preventDefault();
    console.log('Iniciando cambio de contrasena...');

    // Logs de debug para ver el estado del formulario
    console.log('Estado del formulario:', {
      newPassword: passwordForm.newPassword,
      confirmPassword: passwordForm.confirmPassword,
      newPasswordLength: passwordForm.newPassword.length,
      passwordsMatch: passwordForm.newPassword === passwordForm.confirmPassword
    });

    // Validaciones con el backend
    const hasNewPassword = !!passwordForm.newPassword;
    const hasConfirmPassword = !!passwordForm.confirmPassword;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    const isValidPassword = passwordRegex.test(passwordForm.newPassword);
    const passwordsMatch = passwordForm.newPassword === passwordForm.confirmPassword;

    console.log('Validaciones:', {
      hasNewPassword,
      hasConfirmPassword,
      isValidPassword,
      passwordsMatch
    });

    // Solo validar que haya contenido basico
    if (!hasNewPassword || !hasConfirmPassword) {
      console.log('Advertencia: Campos vacios, pero continuando para debug...');
    }

    if (!isValidPassword) {
      console.log('Advertencia: Contrasena no cumple con requisitos establecidos ');
    }

    if (!passwordsMatch) {
      console.log('Advertencia: Contrasenas no coinciden, pero continuando para debug...');
    }

    console.log('Llamando al hook updatePassword...');

    // Llamar al hook para actualizar contrasena (se obtiene el ID automaticamente del token del administrador logueado)
    const success = await updatePassword(passwordForm.newPassword);

    console.log('Resultado del hook:', success);

    if (success) {
      console.log('Contrasena actualizada exitosamente');
      setPasswordSuccess('Contrasena actualizada exitosamente');
      setPasswordForm({ newPassword: '', confirmPassword: '' });
      // Cerrar modal despues de 2 segundos
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess('');
      }, 2000);
    } else {
      console.log('Error al actualizar contrasena:', passwordError);
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({ newPassword: '', confirmPassword: '' });
    setPasswordSuccess('');
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

      {/* Modal para cambiar contraseña */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content password-modal">
            <div className="modal-header">
              <h2>Cambiar Contraseña</h2>
              <button className="modal-close" onClick={closePasswordModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="password-form">
              {passwordSuccess && (
                <div className="success-message">
                  {passwordSuccess}
                </div>
              )}

              {passwordError && (
                <div className="error-message">
                  {passwordError}
                </div>
              )}

              <div className="form-group">
                <label>Nueva Contraseña</label>
                <div className="password-input-container">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordFormChange('newPassword', e.target.value)}
                    placeholder="Ingresa tu nueva contraseña"
                    className="form-input"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <small className="input-help">Mínimo 8 caracteres, una mayúscula, una minúscula, un número, y un carácter especial</small>
              </div>

              <div className="form-group">
                <label>Confirmar Contraseña</label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordFormChange('confirmPassword', e.target.value)}
                    placeholder="Confirma tu nueva contraseña"
                    className="form-input"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {passwordForm.newPassword && passwordForm.confirmPassword &&
                 passwordForm.newPassword !== passwordForm.confirmPassword && (
                  <small className="error-text">Las contraseñas no coinciden</small>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closePasswordModal}
                  disabled={passwordLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminConfiguration;
