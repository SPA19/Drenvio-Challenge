import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const { currentUser, changeUser } = useUser();

  // Usuarios de prueba para simular cambio
  const testUsers = [
    { id: "user123", name: "Usuario Simón" },
    { id: "client456", name: "Cliente VIP" },
    { id: "customer789", name: "Cliente Nuevo" },
  ];

  const handleUserChange = (e) => {
    const selectedUser = testUsers.find((user) => user.id === e.target.value);
    if (selectedUser) {
      changeUser(selectedUser.id, selectedUser.name);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Challenge Node.js/MongoDB/React</h1>
      </div>

      <div className="navbar-menu">
        <Link
          to="/"
          className={`navbar-item ${location.pathname === "/" ? "active" : ""}`}
        >
          Artículos
        </Link>
        <Link
          to="/subida"
          className={`navbar-item ${
            location.pathname === "/subida" ? "active" : ""
          }`}
        >
          Subida
        </Link>
      </div>

      <div className="user-selector">
        <span>Usuario: </span>
        <select value={currentUser.id} onChange={handleUserChange}>
          {testUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
