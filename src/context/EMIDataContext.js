import React, { createContext, useContext, useState } from 'react';

const EMIDataContext = createContext();

export const EMIDataProvider = ({ children }) => {
  const [emiData, setEmiData] = useState(null);

  return (
    <EMIDataContext.Provider value={{ emiData, setEmiData }}>
      {children}
    </EMIDataContext.Provider>
  );
};

export const useEMIData = () => useContext(EMIDataContext);
