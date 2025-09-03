import { useNavigate } from 'react-router-dom';

/**
 * Hook personalizado para simplificar la navegación en la aplicación.
 * @returns {{goTo: (path: string) => void}} Un objeto con una función para navegar a una ruta específica.
 */
export const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return {
    goTo,
  };
};