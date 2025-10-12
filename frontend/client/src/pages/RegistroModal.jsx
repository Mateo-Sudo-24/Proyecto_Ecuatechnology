// src/pages/RegistroModal.jsx
import React, { useState, useEffect } from "react";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { fetchWithToast } from "../helpers/fetchWithToast";
import "../styles/modales.css";

const RegistroModal = ({ isOpen, onClose }) => {
  const { fetchDataBackend } = useFetch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) setFormData({
      nombre: "",
      email: "",
      password: "",
      telefono: ""
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        telefono: formData.telefono
      };

      await fetchWithToast(fetchDataBackend, "/clientes/register", dataToSend, "POST", "web");
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error en registro:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-[#FFF5E6] rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-center text-[#D4AF37] mb-2">Registro</h2>
        <p className="text-center text-gray-600 mb-6">Crea tu cuenta en Ecuatecnology</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej. Juan Pérez"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full rounded-md border border-[#FFF5E6] px-3 py-3 bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.25)] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-[#FFF5E6] px-3 py-3 bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.25)] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono (Opcional)</label>
            <input
              type="text"
              name="telefono"
              placeholder="+593 999 999 999"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full rounded-md border border-[#FFF5E6] px-3 py-3 bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.25)] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-[#FFF5E6] px-3 py-3 bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.25)] transition-all"
                required
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg flex items-center justify-center gap-2 text-black transition"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <div className="text-center text-sm mt-4">
            ¿Ya tienes cuenta? <span className="text-[#D4AF37] font-medium cursor-pointer" onClick={() => {onClose(); document.querySelector('[data-login-button]')?.click();}}>Inicia sesión aquí</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroModal;
