import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    // Valor predeterminado para pruebas
    id: "user123",
    name: "Usuario de Prueba",
  });

  const changeUser = (newUserId, newUserName) => {
    setCurrentUser({
      id: newUserId,
      name: newUserName || `Usuario ${newUserId}`,
    });
  };

  const value = {
    currentUser,
    changeUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
