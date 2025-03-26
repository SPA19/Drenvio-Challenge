//se Utiliza variable de entrono para el despliegue
const API_URL = import.meta.env.VITE_API_URL || "/api";

//Función global para las peticiones
export const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();

  } catch (error) {

    console.error(`Error en llamada a API (${endpoint}):`, error);
    throw error;
  }
};
