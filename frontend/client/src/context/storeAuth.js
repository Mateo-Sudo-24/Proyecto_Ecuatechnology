// src/context/storeAuth.jsx
import { create } from "zustand";
import { useProfileStore } from "./storeProfile.js"; // Importamos el store de perfil

const useAuthStore = create((set) => ({
  token: null,
  role: null,
  email: null,

  // Guardar usuario completo
  setUser: ({ token, role, email }) => {
    set({ token, role, email });
    if (token) localStorage.setItem("token", token);
    if (role) localStorage.setItem("role", role);
    if (email) localStorage.setItem("email", email);
  },

  // Inicializar store desde localStorage
  initializeUser: () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (token && role && email) {
      set({ token, role, email });
    }
  },

  // Cerrar sesión
  logout: () => {
    // 1️⃣ Limpiar storeAuth
    set({ token: null, role: null, email: null });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("profile"); // Si guardamos perfil en localStorage

    // 2️⃣ Limpiar automáticamente el storeProfile
    const clearProfile = useProfileStore.getState().clearUser;
    if (clearProfile) clearProfile();
  },
}));

export default useAuthStore;
