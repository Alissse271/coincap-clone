import { ReactNode } from 'react';

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

export interface CurrencyContextProps {
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

export interface ContextProviderProps {
    children: ReactNode;
}

export interface PortfolioCurrency {
    name: string;
    symbol: string;
    amount: number;
    price: string;
}

export interface PortfolioCurrencyContextProps {
    portfolioCurrencies: PortfolioCurrency[];
    totalPortfolioPrice: string;
    addCurrency: (currency: PortfolioCurrency, amount: number) => void;
    removeCurrency: (name: string) => void;
    setTotalPrice: (price: string) => void;
}
