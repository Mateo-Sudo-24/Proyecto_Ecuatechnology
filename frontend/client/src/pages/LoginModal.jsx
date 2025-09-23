// src/pages/LoginModal.jsx
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { fetchWithToast } from "../helpers/fetchWithToast";
import useAuthStore from "../context/storeAuth";
import { normalizeEmail } from "../helpers/normalizeEmail"; //Importamos normalizeEmail
import "../styles/modales.css";

const LoginModal = ({ isOpen, onClose }) => {
  const { fetchDataBackend } = useFetch();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [step, setStep] = useState("login"); // login | otp
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [rol, setRol] = useState(null); // admin o cliente
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "" });
      setOtp("");
      setRol(null);
      setOtpMessage("");
      setStep("login");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Paso 1: Login email + password
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🔹 Normalizamos el email antes de enviarlo
      const emailNormalized = normalizeEmail(formData.email);

      // Detectar admin: si el correo empieza con "admin" (mayúsculas o minúsculas)
      const isAdmin = formData.email.toLowerCase().startsWith("admin");
      const endpoint = isAdmin ? "/admin/login" : "/cliente/login";

      await fetchWithToast(
        fetchDataBackend,
        endpoint,
        { email: emailNormalized, password: formData.password }, // 🔹 usamos emailNormalized
        "POST"
      );

      const detectedRole = isAdmin ? "administrador" : "cliente";
      setRol(detectedRole);

      // Guardar rol temporal en store/localStorage antes del OTP
      setUser({ token: null, role: detectedRole, email: emailNormalized });

      // Pasamos al paso OTP
      setOtpMessage("Se ha enviado un OTP a tu correo");
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
      const endpoint = rol === "administrador" ? "/admin/verify-otp" : "/cliente/verify-otp";

      // 🔹 Normalizamos el email también aquí antes de enviar OTP
      const emailNormalized = normalizeEmail(formData.email);

      const res = await fetchWithToast(
        fetchDataBackend,
        endpoint,
        { email: emailNormalized, otp }, // 🔹 usamos emailNormalized
        "POST"
      );

      // Guardar token y rol en store + localStorage
      setUser({ token: res.token, role: rol, email: emailNormalized });

      // Redirigir al dashboard correspondiente
      navigate(rol === "administrador" ? "/admin" : "/cliente");

      onClose();
    } catch (error) {
      console.error("Error en verificación OTP:", error);
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

        <h2 className="text-2xl font-bold text-center text-[#D4AF37] mb-2">
          {step === "login" ? "Iniciar Sesión" : "Ingresa OTP"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {step === "login"
            ? "Accede a tu cuenta de Ecuatecnology"
            : "Verifica tu identidad para continuar"}
        </p>

        {step === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-[#FFF5E6] px-3 py-3 bg-white focus:outline-none focus:border-[#D4AF37] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#FFF5E6] px-3 py-3 bg-white focus:outline-none focus:border-[#D4AF37] transition-all"
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
              style={{ backgroundColor: "var(--primary)" }}
            >
              {isSubmitting ? "Enviando..." : "Iniciar Sesión"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            {otpMessage && (
              <p className="text-green-700 text-center font-medium bg-green-100 py-2 rounded-lg">
                {otpMessage}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Código OTP</label>
              <input
                type="text"
                value={otp}
                placeholder="Ingresa el código recibido"
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-md border border-[#FFF5E6] px-3 py-3 bg-white focus:outline-none focus:border-[#D4AF37] transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg flex items-center justify-center gap-2 text-black transition"
              style={{ backgroundColor: "var(--primary)" }}
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
