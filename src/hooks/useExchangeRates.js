import { useEffect, useState } from "react";
import { useCurrencyContext } from "../context/CurrencyContext";

const useExchangeRates = () => {
  const { selectedCurrency } = useCurrencyContext();
  const baseCurrency = selectedCurrency || "INR";

  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`);
        const data = await res.json();

        if (!data || !data.rates) {
          throw new Error("Invalid API response structure");
        }

        setExchangeRates(data.rates);
      } catch (err) {
        setError("Invalid response from exchange rate API");
        setExchangeRates({});
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return { exchangeRates, loading, error, baseCurrency };
};

export default useExchangeRates;
