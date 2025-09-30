// src/context/storeAuth.jsx
import { create } from "zustand";

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
    set({ token: null, role: null, email: null });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
  },
}));

export default useAuthStore;
