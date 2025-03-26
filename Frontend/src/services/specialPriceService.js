import { fetchAPI } from "./api";

//Rutas del servidor
export const createSpecialPrice = async (specialPriceData) => {
  return fetchAPI("/precios-especiales", {
    method: "POST",
    body: JSON.stringify(specialPriceData),
  });
};

export const getSpecialPricesByUser = async (userId) => {
  return fetchAPI(`/precios-especiales/user/${userId}`);
};

export const deleteSpecialPrice = async (id) => {
  return fetchAPI(`/precios-especiales/${id}`, {
    method: "DELETE",
  });
};

export const checkUserHasSpecialPrices = async (userId) => {
  return fetchAPI(`/precios-especiales/check/${userId}`);
};