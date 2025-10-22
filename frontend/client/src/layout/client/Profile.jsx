import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import useAuthStore from '../../context/storeAuth';
import { Eye, EyeOff } from 'lucide-react';

const Profile = () => {
  const { fetchDataBackend } = useFetch();
  const token = useAuthStore((state) => state.token);

  const [profile, setProfile] = useState({
    nombre: '',
    email: '',
    telefono: '',
    confirmEmail: false,
    createdAt: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Estados para controlar visibilidad de contraseñas
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Cargar perfil del cliente
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const data = await fetchDataBackend('clientes/profile', null, 'GET', true);

        if (data && data.profile) {
          setProfile(data.profile);
        } else {
          // Si no hay datos del backend, usar datos por defecto
          setProfile({
            nombre: 'Juan Carlos Pérez',
            email: 'juan.perez@empresa.com',
            telefono: '+34 612 345 678',
            confirmEmail: true,
            createdAt: new Date().toISOString()
          });
        }
      } catch (err) {
        console.error('Error al cargar el perfil:', err);
        setError('Error al cargar el perfil: ' + (err.message || 'Error desconocido'));

        // Usar datos por defecto si hay error
        setProfile({
          nombre: 'Juan Carlos Pérez',
          email: 'juan.perez@empresa.com',
          telefono: '+34 612 345 678',
          confirmEmail: true,
          createdAt: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token, fetchDataBackend]);

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      setError('');
      setMessage('');

      const response = await fetchDataBackend('clientes/profile', {
        nombre: profile.nombre,
        telefono: profile.telefono
      }, 'PUT', true);

      if (response && response.profile) {
        setProfile(response.profile);
        setMessage('Perfil actualizado con éxito');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      setError('Error al actualizar el perfil: ' + (err.message || 'Error desconocido'));
      setTimeout(() => setError(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    // Solo proceder si hay datos en los campos
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError('Por favor completa todos los campos');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validaciones básicas
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setSaving(true);
      setError('');
      setMessage('');

      const response = await fetchDataBackend('clientes/change-password', {
        currentPassword,
        newPassword
      }, 'POST', true);

      if (response) {
        setMessage('✅ Contraseña cambiada con éxito');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error al cambiar contraseña:', err);
      setError('❌ Error al cambiar la contraseña: ' + (err.message || 'Error desconocido'));
      setTimeout(() => setError(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 text-gray-800 w-full font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 text-gray-800 w-full font-sans">
      <h2 className="text-2xl font-bold mb-1">Mi Perfil</h2>
      <p className="mb-6">Gestiona tu información personal y configuración de cuenta</p>

      {/* Perfil */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-2">Información Personal</h3>
        <p className="text-gray-600 mb-4">Actualiza tu información personal y datos de contacto</p>

        {/* Foto */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src="profile-pic.jpg"
            alt="Foto de Perfil"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <button className="px-4 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#8B6914] transition-colors">
              Cambiar Foto
            </button>
            <p className="text-sm text-gray-500">JPG, PNG o GIF, Máximo 2MB</p>
          </div>
        </div>

        {/* Detalles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre Completo</label>
            <input
              type="text"
              value={profile.nombre || ''}
              onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
              className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all"
              disabled={saving}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={profile.email || ''}
              className="w-full rounded-lg border border-gray-300 p-3 bg-gray-100 text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all"
              disabled={true}
            />
            <p className="text-xs text-gray-500 mt-1">El correo electrónico no se puede cambiar</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              value={profile.telefono || ''}
              onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
              className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all"
              disabled={saving}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de Registro</label>
            <input
              type="text"
              value={profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('es-ES') : ''}
              className="w-full rounded-lg border border-gray-300 p-3 bg-gray-100 text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all"
              disabled={true}
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Estado de verificación: {profile.confirmEmail ? (
              <span className="text-green-600 font-medium">Verificado</span>
            ) : (
              <span className="text-yellow-600 font-medium">Pendiente de verificación</span>
            )}
          </p>
        </div>
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#8B6914] transition-colors"
        >
          Guardar Cambios
        </button>
      </div>

      {/* Cambiar contraseña */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Cambiar Contraseña</h3>
        <p className="text-gray-600 mb-4">Actualiza tu contraseña para mantener tu cuenta segura</p>

        {message && (
          <div className={`mb-4 p-3 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Contraseña Actual</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Confirmar Nueva Contraseña</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 bg-white text-neutral focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/25 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
          <li>La contraseña debe tener:</li>
          <li>Al menos 8 caracteres</li>
          <li>Una combinación de letras y números</li>
          <li>Al menos un carácter especial (recomendado)</li>
        </ul>

        <button
          onClick={handleChangePassword}
          className="px-4 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#8B6914] transition-colors"
        >
          Cambiar Contraseña
        </button>
      </div>
    </div>
  );
};

export default Profile;
