import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

const ConfirmacionCorreo = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { fetchDataBackend } = useFetch();

  useEffect(() => {
    if (!token) return;

    const confirmarCorreo = async () => {
      const toastId = toast.loading("Procesando, por favor espera...");
      try {
        const res = await fetchDataBackend(`/clientes/confirm/${token}`, null, "GET", "web");


        // ✅ Mostramos toast verde de éxito
        toast.update(toastId, {
          render: res.message || "Correo confirmado con éxito",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        // Solo cerramos toast de carga, sin mostrar error al usuario
        toast.dismiss(toastId);
        console.warn("Token inválido o ya usado:", error.message);
      }
    };

    confirmarCorreo();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-success-light border border-success text-success-dark p-6 rounded-lg text-center shadow-md">
        <h2 className="text-2xl font-bold mb-2">¡Cuenta confirmada!</h2>
        <p>Ya puedes ir al login y acceder a tu cuenta.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-success text-white rounded hover:bg-success-dark transition-all"
        >
          Ir al login
        </button>
      </div>
    </div>
  );
};

export default ConfirmacionCorreo;
