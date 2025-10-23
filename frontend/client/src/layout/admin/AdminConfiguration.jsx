import React, { useState } from 'react';
import { Key, Download, Database, Check, Eye, EyeOff, X } from 'lucide-react';
import useUpdatePassword from '../../hooks/useUpdatePassword';

const AdminConfiguration = () => {
  // Hooks para cambio de contraseña
  const { updatePassword, loading: passwordLoading, error: passwordError } = useUpdatePassword();

  const [companyInfo, setCompanyInfo] = useState({
    name: 'Ecuatecnology S.A.',
    phone: '099 123 4567',
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
    <div className="w-full max-w-none m-0">
      <div className="p-8 w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral m-0">Configuración</h1>
        </div>

        <div className="flex flex-col gap-8 max-w-[1200px] m-0">
        {/* Información de la Empresa */}
        <div className="bg-background border border-neutral-200 rounded-lg p-8 shadow-sm max-w-[1000px] m-0">
          <h2 className="text-xl font-semibold text-neutral mb-6">Información de la Empresa</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Nombre de la Empresa</label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                className="p-4 border border-gray-300 rounded-md text-sm text-neutral bg-white transition-all focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Teléfono de Contacto</label>
              <input
                type="tel"
                value={companyInfo.phone}
                onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                className="p-4 border border-gray-300 rounded-md text-sm text-neutral bg-white transition-all focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Email de Contacto</label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                className="p-4 border border-gray-300 rounded-md text-sm text-neutral bg-white transition-all focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Dirección</label>
              <input
                type="text"
                value={companyInfo.address}
                onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                className="p-4 border border-gray-300 rounded-lg text-sm text-neutral bg-white transition-all focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25"
              />
            </div>
          </div>
        </div>


        {/* Notificaciones y Automatización */}
        <div className="bg-background border border-neutral-200 rounded-lg p-8 shadow-sm max-w-[1000px] m-0">
          <h2 className="text-xl font-semibold text-neutral mb-6">Notificaciones y Automatización</h2>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-md border border-neutral-200">
              <div>
                <h3 className="text-lg font-semibold text-neutral mb-1">Notificaciones por Email</h3>
                <p className="text-sm text-gray-600">Recibir notificaciones de tickets y cambios importantes</p>
              </div>
              <button
                className={`w-6 h-6 border-2 rounded border-neutral-300 bg-background cursor-pointer transition-all flex items-center justify-center ${
                  notifications.emailNotifications ? 'bg-[#B8860B] border-[#B8860B]' : ''
                }`}
                onClick={() => handleNotificationChange('emailNotifications')}
              >
                {notifications.emailNotifications && <Check size={16} className="text-background" />}
              </button>
            </div>
            <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-md border border-neutral-200">
              <div>
                <h3 className="text-lg font-semibold text-neutral mb-1">Backup Automático</h3>
                <p className="text-sm text-gray-600">Realizar respaldo automático diario de los datos</p>
              </div>
              <button
                className={`w-6 h-6 border-2 rounded border-neutral-300 bg-background cursor-pointer transition-all flex items-center justify-center ${
                  notifications.automaticBackup ? 'bg-[#B8860B] border-[#B8860B]' : ''
                }`}
                onClick={() => handleNotificationChange('automaticBackup')}
              >
                {notifications.automaticBackup && <Check size={16} className="text-background" />}
              </button>
            </div>
            <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-md border border-neutral-200">
              <div>
                <h3 className="text-lg font-semibold text-neutral mb-1">Mantenimiento Programado</h3>
                <p className="text-sm text-gray-600">Activar ventana de mantenimiento los domingos a las 2:00 AM</p>
              </div>
              <button
                className={`w-6 h-6 border-2 rounded border-neutral-300 bg-background cursor-pointer transition-all flex items-center justify-center ${
                  notifications.scheduledMaintenance ? 'bg-[#B8860B] border-[#B8860B]' : ''
                }`}
                onClick={() => handleNotificationChange('scheduledMaintenance')}
              >
                {notifications.scheduledMaintenance && <Check size={16} className="text-background" />}
              </button>
            </div>
          </div>
        </div>

        {/* Seguridad y Datos */}
        <div className="bg-background border border-neutral-200 rounded-lg p-8 shadow-sm max-w-[1000px] m-0">
          <h2 className="text-xl font-semibold text-neutral mb-6">Seguridad y Datos</h2>
          <div className="flex flex-col gap-4">
            <button
              className="flex items-center gap-4 p-4 rounded-md text-sm font-medium cursor-pointer transition-all text-left bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleChangePassword}
            >
              <Key size={20} />
              Cambiar Contraseña
            </button>
            <button
              className="flex items-center gap-4 p-4 rounded-md text-sm font-medium cursor-pointer transition-all text-left bg-background text-neutral border border-neutral-200 hover:bg-neutral-50"
              onClick={handleExportData}
            >
              <Download size={20} />
              Exportar Datos
            </button>
            <button
              className="flex items-center gap-4 p-4 rounded-md text-sm font-medium cursor-pointer transition-all text-left bg-background text-neutral border border-neutral-200 hover:bg-neutral-50"
              onClick={handleManualBackup}
            >
              <Database size={20} />
              Realizar Backup Manual
            </button>
          </div>
        </div>

      </div>

      {/* Modal para cambiar contraseña */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral m-0">Cambiar Contraseña</h2>
              <button
                className="bg-white border-none text-gray-500 hover:text-neutral p-2 rounded transition-all"
                onClick={closePasswordModal}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              {passwordSuccess && (
                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-lg animate-in slide-in-from-top duration-300">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✅</span>
                    <p className="text-green-700 text-sm font-medium">{passwordSuccess}</p>
                  </div>
                </div>
              )}

              {passwordError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg animate-in slide-in-from-top duration-300">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-lg">⚠️</span>
                    <p className="text-red-700 text-sm font-medium">{passwordError}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Nueva Contraseña</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordFormChange('newPassword', e.target.value)}
                    placeholder="Ingresa tu nueva contraseña"
                    className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all pr-12"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <small className="text-gray-500 text-xs">Mínimo 8 caracteres, una mayúscula, una minúscula, un número, y un carácter especial</small>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordFormChange('confirmPassword', e.target.value)}
                    placeholder="Confirma tu nueva contraseña"
                    className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all pr-12"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {passwordForm.newPassword && passwordForm.confirmPassword &&
                 passwordForm.newPassword !== passwordForm.confirmPassword && (
                  <small className="text-red-500 text-xs">Las contraseñas no coinciden</small>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all font-medium disabled:opacity-50"
                  onClick={closePasswordModal}
                  disabled={passwordLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#B8860B] text-white rounded-md hover:bg-[#8B6914] transition-all font-medium disabled:opacity-50"
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
