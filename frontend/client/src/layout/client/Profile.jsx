import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Juan Carlos Pérez',
    email: 'juan.perez@empresa.com',
    phone: '+34 612 345 678',
    address: 'Calle Mayor 123, 28001 Quito, Ecuador',
    additionalInfo: 'Cliente desde 2020. Responsable de mantenimiento de las oficinas centrales.'
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = () => {
    console.log('Profile saved:', profile);
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      console.log('Password changed to:', newPassword);
    } else {
      console.log('Passwords do not match');
    }
  };

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
            <button className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white transition">
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
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-2 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-2 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-2 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full p-2 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <p className="mt-4 text-gray-600">{profile.additionalInfo}</p>
        <button
          onClick={handleSaveChanges}
          className="mt-4 px-6 py-2 rounded bg-yellow-400 text-white hover:bg-yellow-500 transition"
        >
          Guardar Cambios
        </button>
      </div>

      {/* Cambiar contraseña */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Cambiar Contraseña</h3>
        <p className="text-gray-600 mb-4">Actualiza tu contraseña para mantener tu cuenta segura</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña Actual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
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
          className="mt-4 px-6 py-2 rounded bg-yellow-400 text-white hover:bg-yellow-500 transition"
        >
          Cambiar Contraseña
        </button>
      </div>
    </div>
  );
};

export default Profile;
