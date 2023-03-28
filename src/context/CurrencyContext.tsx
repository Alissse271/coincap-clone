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
    showMoreCurrencies: () => void;
}

interface Props {
    children: ReactNode;
}

export const CurrencyContext = createContext<CurrencyContextProps>({
    currencies: [],
    showMoreCurrencies: () => {},
});

export const CurrencyContextProvider = ({ children }: Props) => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [limit, setLimit] = useState<number>(20);

    const fetchCurrencies = async (limit: number) => {
        const response = await axios.get(
            `https://api.coincap.io/v2/assets?limit=${limit}`
        );

        setCurrencies(response.data.data);
    };

    const showMoreCurrencies = () => {
        setLimit((prevLimit) => prevLimit + 20);
    };

    useEffect(() => {
        fetchCurrencies(limit);
    }, [limit]);

    return (
        <CurrencyContext.Provider value={{ currencies, showMoreCurrencies }}>
            {children}
        </CurrencyContext.Provider>
    );
};
