// src/store/storeAuth.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  role: null,
  email: null,

  // Guardar usuario en store y localStorage
  setUser: ({ token, role, email }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email || "");
    set({ token, role, email });
  },

  // Inicializar store desde localStorage al cargar la app
  initializeUser: () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    if (token && role) set({ token, role, email });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    set({ token: null, role: null, email: null });
  },
}));

export default useAuthStore;
