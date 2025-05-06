import React, { createContext, useContext, useState } from "react";
export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [baseCurrency, setBaseCurrency] = useState("USD");

  return (
    <CurrencyContext.Provider value={{ baseCurrency, setBaseCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrencyContext must be used within a CurrencyProvider");
  }
  return context;
};
