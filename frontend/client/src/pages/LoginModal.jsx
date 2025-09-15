// src/pages/LoginModal.jsx
import React, { useState, useEffect } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { fetchWithToast } from "../helpers/fetchWithToast";

const LoginModal = ({ isOpen, onClose }) => {
  const { fetchDataBackend } = useFetch();
  const navigate = useNavigate();

  const [step, setStep] = useState("login"); // 'login' o 'otp'
  const [formData, setFormData] = useState({ email: "", password: "", role: "cliente" });
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "", role: "cliente" });
      setOtp("");
      setStep("login");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Paso 1: Login email + password
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = formData.role === "administrador" ? "/admin/login" : "/cliente/login";
      await fetchWithToast(fetchDataBackend, endpoint, {
        email: formData.email,
        password: formData.password,
      }, "POST");

      // Si backend envía OTP → siguiente paso
      setStep("otp");
    } catch (error) {
      console.error("Error en login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Paso 2: Verificar OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = formData.role === "administrador" ? "/admin/verify-otp" : "/cliente/verify-otp";
      const res = await fetchWithToast(fetchDataBackend, endpoint, {
        email: formData.email,
        otp,
      }, "POST");

      // Guardar token y rol en localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", formData.role);

      // Redirigir al dashboard correspondiente
      navigate(formData.role === "administrador" ? "/admin" : "/cliente");
      onClose();
    } catch (error) {
      console.error("Error en verificación OTP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {step === "login" ? "Iniciar Sesión" : "Ingresa OTP"}
        </h2>

        {step === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Soy:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
              >
                <option value="cliente">Cliente</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <LogIn size={18} /> {isSubmitting ? "Enviando..." : "Iniciar Sesión"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Código OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Verificando..." : "Verificar OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
