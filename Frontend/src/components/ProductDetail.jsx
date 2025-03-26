import React from "react";
import "./ProductDetail.css";

const ProductDetail = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="product-details">
      {products.map((product) => (
        <div
          key={`product-details-${product._id}`}
          className="product-detail-card"
        >
          <h3>{product.name}</h3>
          <p>
            <strong>SKU:</strong> {product.sku}
          </p>
          <p>
            <strong>Marca:</strong> {product.brand}
          </p>
          <p>
            <strong>Categoría:</strong> {product.category}
          </p>
          <p>
            <strong>Descripción:</strong> {product.description}
          </p>
          <div className="tags">
            {product.tags &&
              product.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
          </div>
          <p className="date-info">
            <small>
              Creado: {new Date(product.createdAt).toLocaleDateString()}
            </small>
            <br />
            <small>
              Actualizado: {new Date(product.updatedAt).toLocaleDateString()}
            </small>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
