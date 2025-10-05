// src/context/UserContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // If you want defaults, keep them here. Otherwise start empty.
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  // Optional: you can expose a helper to update user partially
  const updateUser = (partial) => setUser((prev) => ({ ...prev, ...partial }));

  const value = useMemo(() => ({ user, setUser, updateUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
