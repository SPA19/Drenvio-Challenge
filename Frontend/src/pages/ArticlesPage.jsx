import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import ProductTable from "../components/ProductTable";
import { fetchProductsWithSpecialPrices } from "../services/productService";
import "./ArticlesPage.css";
import ProductDetail from "../components/ProductDetail";

const ArticlesPage = () => {
  const { currentUser } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const productsData = await fetchProductsWithSpecialPrices(
          currentUser.id
        );
        setProducts(productsData);
      } catch (err) {
        setError("Error al cargar productos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentUser.id]);

  return (
    <div className="articles-page">
      <h2>Catálogo de Artículos</h2>
      <p className="user-info">
        Usuario actual: <strong>{currentUser.name}</strong>
      </p>

      {products.some((p) => p.hasSpecialPrice) && (
        <div className="special-price-info">
          Los productos con precio especial para este usuario están resaltados.
        </div>
      )}

      <ProductTable products={products} loading={loading} error={error} />
      {!loading && !error && products.length > 0 && (
        <div>
          <h2 className="detail-article">Detalle de los Artículos</h2>
          <ProductDetail products={products} />
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
