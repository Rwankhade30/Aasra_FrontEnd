// src/context/UserContext.jsx
import React, { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Simulated user (replace with real auth logic later)
  const user = {
    full_name: "Prathamesh Gatfane",
    email: "you@example.com",
    phone_number: "1234567890",
    address: "Pune, India",
  };

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
