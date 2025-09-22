import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { fetchWithToast } from "../../helpers/fetchWithToast";

const Profile = () => {
  const { fetchDataBackend } = useFetch();

  const [profile, setProfile] = useState({
    name: "Juan Carlos Pérez",
    email: "juan.perez@empresa.com",
    phone: "+34 612 345 678",
    address: "Calle Mayor 123, 28001 Quito, Ecuador",
    additionalInfo:
      "Cliente desde 2020. Responsable de mantenimiento de las oficinas centrales.",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const handleSaveChanges = async () => {
    try {
      setLoadingProfile(true);
      await fetchWithToast(
        fetchDataBackend,
        "/cliente/update", // 🔹 reemplaza con tu endpoint real
        profile,
        "PUT"
      );
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoadingPassword(true);
      await fetchWithToast(
        fetchDataBackend,
        "/cliente/change-password", // 🔹 reemplaza con tu endpoint real
        { currentPassword, newPassword },
        "POST"
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="p-6 w-full text-neutral-700 font-sans">
      <h2 className="text-2xl font-bold">Mi Perfil</h2>
      <p className="mb-4 text-gray-600">
        Gestiona tu información personal y configuración de cuenta
      </p>

      {/* Información Personal */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-lg font-bold mb-1">Información Personal</h3>
        <p className="text-gray-500 mb-4">
          Actualiza tu información personal y datos de contacto
        </p>

        <div className="flex items-center gap-4 mb-4">
          <img
            src="profile-pic.jpg"
            alt="Foto de Perfil"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
              Cambiar Foto
            </button>
            <p className="text-sm text-gray-500 mt-1">
              JPG, PNG o GIF, Máximo 2MB
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600">{profile.additionalInfo}</p>

        <button
          onClick={handleSaveChanges}
          disabled={loadingProfile}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
        >
          {loadingProfile ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      {/* Cambiar Contraseña */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold mb-1">Cambiar Contraseña</h3>
        <p className="text-gray-500 mb-4">
          Actualiza tu contraseña para mantener tu cuenta segura
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Contraseña Actual
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <ul className="text-sm text-gray-500 list-disc pl-5">
            <li>La contraseña debe tener al menos 8 caracteres</li>
            <li>Debe incluir letras y números</li>
            <li>Se recomienda incluir un carácter especial</li>
          </ul>

          <button
            onClick={handleChangePassword}
            disabled={loadingPassword}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loadingPassword ? "Cambiando..." : "Cambiar Contraseña"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
