// fetchWithToast.js
import { toast } from "react-toastify";

export const fetchWithToast = async (fetchFn, endpoint, data = null, method = "GET") => {
  const toastId = toast.loading("Procesando, por favor espera...");
  try {
    const res = await fetchFn(endpoint, data, method);

    // Si viene un objeto de errores del backend
    if (res.errors) {
      const errorsText = res.errors.map(e => `${e.field}: ${e.message}`).join("\n");
      toast.update(toastId, {
        render: errorsText,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      return res; // opcional, para poder usarlo
    }

    toast.update(toastId, {
      render: res?.message || "¡Éxito!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });

    return res;
  } catch (error) {
    toast.update(toastId, {
      render: error.message || "Error desconocido",
      type: "error",
      isLoading: false,
      autoClose: 4000,
    });
    return error;
  }
};
