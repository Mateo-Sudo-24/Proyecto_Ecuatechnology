// src/context/storeAuth.jsx
import { create } from "zustand";
import { useProfileStore } from "./storeProfile.js"; // Importamos el store de perfil

const useAuthStore = create((set, get) => ({
  token: null,
  role: null,
  email: null,
  isLoading: false,

  // Guardar usuario completo
  setUser: ({ token, role, email }) => {
    set({ token, role, email });
    if (token) localStorage.setItem("token", token);
    if (role) localStorage.setItem("role", role);
    if (email) localStorage.setItem("email", email);
  },

  // Inicializar store desde localStorage y cargar perfil
  initializeUser: async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (token && role && email) {
      set({ token, role, email, isLoading: true });

      // Si es cliente, cargar automáticamente su perfil
      if (role === 'cliente') {
        try {
          await get().loadUserProfile(token);
        } catch (error) {
          console.error("Error al cargar perfil del usuario:", error);
        }
      }

      set({ isLoading: false });
    }
  },

  // Cargar perfil del usuario desde el backend
  loadUserProfile: async (token) => {
    try {
      const baseUrl = import.meta.env.VITE_URL_BACK;
      const response = await fetch(`${baseUrl}/clientes/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.warn("Token inválido o expirado");
          return; // No lanzar error para no interrumpir la carga
        }
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Actualizar el store de perfil con la información del backend
      const setProfileUser = useProfileStore.getState().setUser;
      if (setProfileUser && data.profile) {
        setProfileUser(data.profile);
        // También guardar en localStorage para persistencia
        localStorage.setItem("userProfile", JSON.stringify(data.profile));
      }

    } catch (error) {
      console.error("Error al cargar perfil:", error);
      // No lanzar el error para no interrumpir la carga del módulo
    }
  },


  // Cerrar sesión
  logout: () => {
    // 1️⃣ Limpiar storeAuth
    set({ token: null, role: null, email: null, isLoading: false });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("userProfile"); // Limpiar perfil guardado

    // 2️⃣ Limpiar automáticamente el storeProfile
    const clearProfile = useProfileStore.getState().clearUser;
    if (clearProfile) clearProfile();
  },
}));

export default useAuthStore;
