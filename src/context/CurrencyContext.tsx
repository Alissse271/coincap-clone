import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { convertDate, roundToHundredths } from 'utils';

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

export interface History {
    priceUsd: string;
    time: number;
    date: string;
}

export interface HisoryResponse {
    data: History[];
    timestamp: number;
}

interface CurrencyContextProps {
    currencies: Currency[];
    basicCurrencies: Currency[];
    currencyDetails: Currency;
    limit: number;
    history: HisoryResponse;
    labels: string[];
    chartData: string[];
    fetchCurrencies: (limit: number) => void;
    fetchBasicCurrencies: () => void;
    fetchCurrencyHistory: (id: string) => void;
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
    history: {} as HisoryResponse,
    labels: [],
    chartData: [],
    fetchCurrencies: async () => {},
    fetchBasicCurrencies: async () => {},
    fetchCurrencyHistory: async () => {},
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
    const [labels, setLabels] = useState<string[]>([]);
    const [chartData, setChartData] = useState<string[]>([]);
    const [history, setHistory] = useState<HisoryResponse>(
        {} as HisoryResponse
    );

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

    const fetchCurrencyHistory = async (id: string) => {
        const response = await axios.get(
            `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
        );
        const data: HisoryResponse = await response.data;
        setHistory(data);

        const labels = data.data.map(({ time }) => convertDate(time));
        const chartData = data.data.map(({ priceUsd }) =>
            roundToHundredths(priceUsd)
        );

        setLabels(labels);
        setChartData(chartData);
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
