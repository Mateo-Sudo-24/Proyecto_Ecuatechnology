import { create } from "zustand";

export const useProfileStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  // Establecer información del usuario
  setUser: (user) => {
    set({
      user,
      error: null,
      isLoading: false
    });
  },

  // Actualizar información específica del usuario
  updateUser: (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, ...updates },
        error: null
      });
    }
  },

  // Establecer estado de carga
  setLoading: (loading) => set({ isLoading: loading }),

  // Establecer error
  setError: (error) => set({
    error,
    isLoading: false
  }),

  // Limpiar usuario (logout)
  clearUser: () => set({
    user: null,
    error: null,
    isLoading: false
  }),

  // Inicializar desde localStorage
  initializeFromStorage: () => {
    try {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        const userProfile = JSON.parse(savedProfile);
        set({ user: userProfile });
      }
    } catch (error) {
      console.error("Error al cargar perfil desde localStorage:", error);
    }
  }
}));
