// src/helpers/fetchWithToast.js
import { toast } from "react-toastify";

export const fetchWithToast = async (fetchFn, endpoint, data = null, method = "GET") => {
  const toastId = toast.loading("Procesando, por favor espera...");
  try {
    const res = await fetchFn(endpoint, data, method);
    toast.update(toastId, {
      render: res?.message || "¡Éxito!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    return res;
  } catch (error) {
    toast.update(toastId, {
      render: error.message,
      type: "error",
      isLoading: false,
      autoClose: 4000,
    });
    throw error;
  }
};
