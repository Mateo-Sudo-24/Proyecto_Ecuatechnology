import axios from "axios";
import { useCallback } from "react";

const API_URL = import.meta.env.VITE_API_DESK.endsWith("/")
  ? import.meta.env.VITE_API_DESK
  : import.meta.env.VITE_API_DESK + "/";

function useFetch() {
  const fetchDataBackend = useCallback(
    async (endpoint, data = null, method = "GET") => {
      const url = endpoint.startsWith("/") ? `${API_URL}${endpoint.slice(1)}` : `${API_URL}${endpoint}`;
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
        const errorMsg =
          error?.response?.data?.msg ||
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Error desconocido";

        throw new Error(errorMsg);
      }
    },
    []
  );

  return { fetchDataBackend };
}

export default useFetch;
