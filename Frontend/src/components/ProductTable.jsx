import React from "react";
import "./ProductTable.css";

const ProductTable = ({ products, loading, error }) => {
  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="no-data">No hay productos disponibles</div>;
  }

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Precio</th>
            {products.some((p) => p.hasSpecialPrice) && (
              <th>Precio Original</th>
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={`product-table-${product._id}`}
              className={product.hasSpecialPrice ? "special-price" : ""}
            >
              <td>{product._id}</td>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td className={product.hasSpecialPrice ? "price-highlight" : ""}>
                ${product.price.toFixed(2)}
              </td>
              {products.some((p) => p.hasSpecialPrice) && (
                <td>
                  {product.originalPrice
                    ? `$${product.originalPrice.toFixed(2)}`
                    : "-"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;