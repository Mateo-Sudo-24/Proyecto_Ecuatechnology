import axios from "axios";
import { useCallback } from "react";

const API_URL = import.meta.env.VITE_URL_BACK.endsWith("/")
  ? import.meta.env.VITE_URL_BACK
  : import.meta.env.VITE_URL_BACK + "/";

function useFetch() {
  const fetchDataBackend = useCallback(
    async (endpoint, data = null, method = "GET") => {
      const url = endpoint.startsWith("/")
        ? `${API_URL}${endpoint.slice(1)}`
        : `${API_URL}${endpoint}`;
      try {
        const token = localStorage.getItem("token");
        const isFormData = data instanceof FormData;

        const headers = {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(!isFormData ? { "Content-Type": "application/json" } : {}),
        };

        const options = {
          method: method.toUpperCase(),
          url,
          headers,
          ...(method.toUpperCase() !== "GET" && data ? { data } : {}),
        };

        const response = await axios(options);
        return response.data;
      } catch (error) {
        // DEVUELVE EL BODY COMPLETO, NO THROW
        return error.response?.data || { message: "Error desconocido" };
      }
    },
    []
  );

  return { fetchDataBackend };
}

export default useFetch;
