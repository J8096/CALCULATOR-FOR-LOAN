import { useState } from "react";

export const useEMICalculator = () => {
  const [emi, setEMI] = useState(null);

  const calculateEMI = (principal, rate, months) => {
    const monthlyRate = rate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    setEMI(emi);
  };

  return { emi, calculateEMI };
};
