import React, { createContext } from "react";

export const ApiKeyContext = createContext();

const ApiKeyProvider = ({ children }) => {
  const apiKey = "dbe819a63e70b0d74ec1a076413ff2a0"; // 🔐

  return (
    <ApiKeyContext.Provider value={{ apiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export default ApiKeyProvider;
