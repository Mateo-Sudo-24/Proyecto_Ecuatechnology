import React, { useState } from 'react';
import '../../styles/Profile.css'; 
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
    // Logic to save profile changes
    console.log('Profile saved:', profile);
  };

  const handleChangePassword = () => {
    // Logic to change password
    if (newPassword === confirmPassword) {
      console.log('Password changed to:', newPassword);
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <div className="profile-container text-neutral ">
      <h2 className='text-2xl font-bold'>Mi Perfil</h2>
      <p>Gestiona tu información personal y configuración de cuenta</p>
      
      <div className="profile-info">
        <h3>Información Personal</h3>
        <p>Actualiza tu información personal y datos de contacto</p>
        <div className="profile-pic">
          <img src="profile-pic.jpg" alt="Foto de Perfil" />
          <button>Cambiar Foto</button>
          <p>JPG, PNG o GIF, Máximo 2MB</p>
        </div>
        <div className="profile-details ">
          <div >
            <label>Nombre Completo</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div>
            <label>Correo Electrónico</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </div>
          <div>
            <label>Teléfono</label>
            <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </div>
          <div>
            <label>Dirección</label>
            <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
          </div>
          <p>{profile.additionalInfo}</p>
          <button onClick={handleSaveChanges}>Guardar Cambios</button>
        </div>
      </div>

      <div className="change-password">
        <h3>Cambiar Contraseña</h3>
        <p>Actualiza tu contraseña para mantener tu cuenta segura</p>
        <div>
          <label>Contraseña Actual</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
          <label>Nueva Contraseña</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div>
          <label>Confirmar Nueva Contraseña</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <ul>
          <li>La contraseña debe tener:</li>
          <li>Al menos 8 caracteres</li>
          <li>Una combinación de letras y números</li>
          <li>Al menos un carácter especial (recomendado)</li>
        </ul>
        <button onClick={handleChangePassword}>Cambiar Contraseña</button>
      </div>
    </div>
  );
};

export default Profile;