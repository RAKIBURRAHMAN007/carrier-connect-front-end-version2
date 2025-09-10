import React, { createContext } from "react";

export const ApiKeyContext = createContext();

const ApiKeyProvider = ({ children }) => {
  const apiKey = "from env"; // 🔐

  return (
    <ApiKeyContext.Provider value={{ apiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export default ApiKeyProvider;
