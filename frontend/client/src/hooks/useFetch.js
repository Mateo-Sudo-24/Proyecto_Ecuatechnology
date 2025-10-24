import axios from "axios";
import { useCallback, useRef } from "react";

const WEB_URL = import.meta.env.VITE_URL_BACK.endsWith("/")
  ? import.meta.env.VITE_URL_BACK
  : import.meta.env.VITE_URL_BACK + "/";

const DESK_URL = import.meta.env.VITE_API_DESK.endsWith("/")
  ? import.meta.env.VITE_API_DESK
  : import.meta.env.VITE_API_DESK + "/";

// Cache configuration
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

function useFetch() {
  const cacheRef = useRef(new Map());

  const fetchDataBackend = useCallback(
    async (endpoint, data = null, method = "GET", backend = "web") => {
      const BASE_URL = backend === "desk" ? DESK_URL : WEB_URL;
      const url = endpoint.startsWith("/") ? `${BASE_URL}${endpoint.slice(1)}` : `${BASE_URL}${endpoint}`;
      const cacheKey = `${method.toUpperCase()}:${url}`;

      // Check cache for GET requests
      if (method.toUpperCase() === "GET") {
        const cached = cacheRef.current.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
          return cached.data;
        }
      }

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

        // Cache the response for GET requests
        if (method.toUpperCase() === "GET") {
          cacheRef.current.set(cacheKey, {
            data: response.data,
            timestamp: Date.now(),
          });
        }

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
