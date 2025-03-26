import { fetchAPI } from "./api";

//Rutas del servidor
export const fetchProducts = async () => {
  return fetchAPI("/productos");
};

export const fetchProductsWithSpecialPrices = async (userId) => {
  return fetchAPI(`/productos?userId=${userId}`);
};