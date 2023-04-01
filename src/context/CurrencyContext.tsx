import { createContext, useState } from "react";
import { convertDate, roundWithPrecision } from "utils";
import { Currency, CurrencyContextProps, ContextProviderProps, HisoryResponse } from "./types";
import { coincapAPI } from "services";

export const CurrencyContext = createContext<CurrencyContextProps>({
  currencies: [],
  basicCurrencies: [],
  currencyDetails: {} as Currency,
  limit: 0,
  history: {} as HisoryResponse,
  labels: [],
  chartData: [],
  fetchCurrencies: async () => {},
  fetchBasicCurrencies: async () => {},
  fetchCurrencyHistory: async () => {},
  showMoreCurrencies: () => {},
  fetchCurrencyDetails: async () => {},
});

export const CurrencyContextProvider = ({ children }: ContextProviderProps) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [basicCurrencies, setBasicCurrencies] = useState<Currency[]>([]);
  const [currencyDetails, setCurrencyDetails] = useState<Currency>({} as Currency);
  const [limit, setLimit] = useState<number>(20);
  const [labels, setLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<string[]>([]);
  const [history, setHistory] = useState<HisoryResponse>({} as HisoryResponse);
  const [error, setError] = useState<Error | null>(null);

  const fetchCurrencies = async (limit: number) => {
    try {
      const data = await coincapAPI.getCurrencies(limit);
      console.log(data);

      setLimit(limit);
      setCurrencies(data);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setError(error);
      } else {
        const genericError = new Error("Unknown error occurred");
        console.error(genericError);
        setError(genericError);
      }
    }
  };

  const fetchBasicCurrencies = async () => {
    try {
      const data = await coincapAPI.getBasicCurrencies();
      setBasicCurrencies(data);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setError(error);
      } else {
        const genericError = new Error("Unknown error occurred");
        console.error(genericError);
        setError(genericError);
      }
    }
  };

  const fetchCurrencyDetails = async (id: string) => {
    try {
      const data = await coincapAPI.getCurrencyDetails(id);
      setCurrencyDetails(data);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setError(error);
      } else {
        const genericError = new Error("Unknown error occurred");
        console.error(genericError);
        setError(genericError);
      }
    }
  };

  const fetchCurrencyHistory = async (id: string) => {
    try {
      const data = await coincapAPI.getCurrencyHistory(id);
      const labels = data.data.map(({ time }) => convertDate(time));
      const chartData = data.data.map(({ priceUsd }) => roundWithPrecision(priceUsd, 2));

      setLabels(labels);
      setChartData(chartData);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setError(error);
      } else {
        const genericError = new Error("Unknown error occurred");
        console.error(genericError);
        setError(genericError);
      }
    }
  };

  const showMoreCurrencies = () => {
    setLimit((prevLimit) => prevLimit + 20);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        basicCurrencies,
        currencyDetails,
        limit,
        history,
        labels,
        chartData,
        fetchCurrencies,
        fetchBasicCurrencies,
        fetchCurrencyHistory,
        showMoreCurrencies,
        fetchCurrencyDetails,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
