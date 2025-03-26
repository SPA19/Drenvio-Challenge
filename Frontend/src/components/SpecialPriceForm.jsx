import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { fetchProducts } from "../services/productService";
import { createSpecialPrice } from "../services/specialPriceService";
import "./SpecialPriceForm.css";

const SpecialPriceForm = () => {
  const { currentUser } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    productId: "",
    specialPrice: "",
    reason: "",
    validUntil: "",
  });

  // Cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (err) {
        setError("Error al cargar productos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos
    if (!formData.productId || !formData.specialPrice) {
      setError(
        "Por favor selecciona un producto y especifica un precio especial"
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createSpecialPrice({
        ...formData,
        userId: currentUser.id,
        specialPrice: parseFloat(formData.specialPrice),
      });

      // Reiniciar formulario y mostrar mensaje de éxito
      setFormData({
        productId: "",
        specialPrice: "",
        reason: "",
        validUntil: "",
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Error al guardar el precio especial");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="special-price-form-container">
      <h2>Añadir Precio Especial para {currentUser.name}</h2>

      {success && (
        <div className="success-message">
          ¡Precio especial guardado correctamente!
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="special-price-form">
        <div className="form-group">
          <label htmlFor="productId">Producto:</label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="">-- Seleccionar producto --</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - ${product.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specialPrice">Precio Especial:</label>
          <input
            type="number"
            id="specialPrice"
            name="specialPrice"
            value={formData.specialPrice}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Motivo (opcional):</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="validUntil">Válido hasta (opcional):</label>
          <input
            type="date"
            id="validUntil"
            name="validUntil"
            value={formData.validUntil}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Precio Especial"}
        </button>
      </form>
    </div>
  );
};

export default SpecialPriceForm;