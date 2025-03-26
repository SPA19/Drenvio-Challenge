import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {
  getSpecialPricesByUser,
  deleteSpecialPrice,
} from "../services/specialPriceService";
import "./UserSpecialPrices.css";

const UserSpecialPrices = () => {
  const { currentUser } = useUser();
  const [specialPrices, setSpecialPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSpecialPrices = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getSpecialPricesByUser(currentUser.id);
      console.log(data)
      setSpecialPrices(data);
    } catch (err) {
      setError("Error al cargar precios especiales");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //cargar precios especiales al montar el componente o cuando cambia el usuario
  useEffect(() => {
    loadSpecialPrices();
  }, [currentUser.id]);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "¿Estás seguro de que deseas eliminar este precio especial?"
      )
    ) {
      return;
    }

    try {
      await deleteSpecialPrice(id);
      //recargar la lista después de eliminar
      loadSpecialPrices();
    } catch (err) {
      setError("Error al eliminar precio especial");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Cargando precios especiales...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (specialPrices.length === 0) {
    return (
      <div className="no-special-prices">
        No hay precios especiales para este usuario
      </div>
    );
  }

  return (
    <div className="user-special-prices">
      <h3>Precios Especiales para {currentUser.name}</h3>

      <table className="special-prices-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio Original</th>
            <th>Precio Especial</th>
            <th>Motivo</th>
            <th>Válido Hasta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {specialPrices.map((sp) => (
            <tr key={sp._id}>
              <td>{sp.product?.name || "Producto desconocido"}</td>
              <td>${sp.product?.originalPrice?.toFixed(2) || "-"}</td>
              <td className="special-price">${sp.specialPrice.toFixed(2)}</td>
              <td>{sp.reason || "-"}</td>
              <td>
                {sp.validUntil
                  ? new Date(sp.validUntil).toLocaleDateString()
                  : "Sin fecha límite"}
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(sp._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSpecialPrices;