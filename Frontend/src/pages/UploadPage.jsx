import React, { useState } from "react";
import SpecialPriceForm from "../components/SpecialPriceForm";
import UserSpecialPrices from "../components/UserSpecialPrices";
import "./UploadPage.css";

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="upload-page">
      <h2>Gestión de Precios Especiales</h2>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Añadir Precio Especial
        </button>
        <button
          className={`tab-button ${activeTab === "view" ? "active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          Ver Precios Especiales
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "add" ? <SpecialPriceForm /> : <UserSpecialPrices />}
      </div>
    </div>
  );
};

export default UploadPage;