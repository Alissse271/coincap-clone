import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

export interface Currency {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply?: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
}

interface CurrencyContextProps {
    currencies: Currency[];
    basicCurrencies: Currency[];
    currencyDetails: Currency;
    limit: number;
    fetchCurrencies: (limit: number) => void;
    fetchBasicCurrencies: () => void;
    showMoreCurrencies: () => void;
    fetchCurrencyDetails: (id: string) => void;
}

interface Props {
    children: ReactNode;
}

export const CurrencyContext = createContext<CurrencyContextProps>({
    currencies: [],
    basicCurrencies: [],
    currencyDetails: {} as Currency,
    limit: 0,
    fetchCurrencies: () => {},
    fetchBasicCurrencies: () => {},
    showMoreCurrencies: () => {},
    fetchCurrencyDetails: async () => {},
});

export const CurrencyContextProvider = ({ children }: Props) => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [basicCurrencies, setBasicCurrencies] = useState<Currency[]>([]);
    const [currencyDetails, setCurrencyDetails] = useState<Currency>(
        {} as Currency
    );
    const [limit, setLimit] = useState<number>(20);

    const fetchCurrencies = async (limit: number) => {
        const response = await axios.get(
            `https://api.coincap.io/v2/assets?limit=${limit}`
        );
        setLimit(limit);
        setCurrencies(response.data.data);
    };
    const fetchBasicCurrencies = async () => {
        const response = await axios.get(
            `https://api.coincap.io/v2/assets?limit=3`
        );
        setBasicCurrencies(response.data.data);
    };

    const fetchCurrencyDetails = async (id: string) => {
        try {
            const response = await axios.get(
                `https://api.coincap.io/v2/assets/${id}`
            );
            const data: Currency = response.data.data;
            setCurrencyDetails(data);
        } catch (error) {
            console.error(error);
            return null;
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
                fetchCurrencies,
                fetchBasicCurrencies,
                showMoreCurrencies,
                fetchCurrencyDetails,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};