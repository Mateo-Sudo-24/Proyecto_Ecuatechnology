// src/pages/RegistroModal.jsx
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { fetchWithToast } from "../helpers/fetchWithToast";

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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm md:max-w-md p-4 md:p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl md:text-2xl leading-none"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-center text-primary mb-2">Registro</h2>
        <p className="text-center text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Crea tu cuenta en Ecuatecnology</p>

        <form onSubmit={handleRegister} className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 md:p-3 bg-white text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 md:p-3 bg-white text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono (Opcional)</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 md:p-3 bg-white text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all text-sm md:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2 md:p-3 bg-white text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all text-sm md:text-base"
                required
              />
              <span
                className="absolute top-2 md:top-3 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={16} md:size={18} /> : <EyeOff size={16} md:size={18} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 md:p-3 rounded-lg flex items-center justify-center gap-2 text-white transition-all bg-[#B8860B] hover:bg-[#8B6914] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
          >
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <div className="text-center text-xs md:text-sm mt-4">
            ¿Ya tienes cuenta? <span className="text-[#B8860B] font-medium cursor-pointer" onClick={() => {onClose(); document.querySelector('[data-login-button]')?.click();}}>Inicia sesión aquí</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroModal;
