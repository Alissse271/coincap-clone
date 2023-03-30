import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import {
    ContextProviderProps,
    Currency,
    PortfolioCurrency,
    PortfolioCurrencyContextProps,
} from './types';

const portfolio: PortfolioCurrency[] = JSON.parse(
    localStorage.getItem('portfolio') || '[]'
);

export const PortfolioContext = createContext<PortfolioCurrencyContextProps>({
    portfolioCurrencies: portfolio,
    totalPortfolioPrice: '',
    addCurrency: () => {},
    removeCurrency: () => {},
    setTotalPrice: () => {},
    updatePortfolio: () => {},
});

export const PortfolioContextProvider = ({
    children,
}: ContextProviderProps) => {
    const [portfolioCurrencies, setPortfolioCurrencies] =
        useState<PortfolioCurrency[]>(portfolio);
    const [totalPortfolioPrice, setTotalPortfolioPrice] = useState<string>('');
    useEffect(() => {
        localStorage.setItem('portfolio', JSON.stringify(portfolioCurrencies));
        localStorage.setItem(
            'portfolioCost',
            JSON.stringify(totalPortfolioPrice)
        );
    }, [portfolioCurrencies]);

    const addCurrency = (currency: PortfolioCurrency, amount: number) => {
        const existingItem = portfolioCurrencies.find(
            ({ id }) => id === currency.id
        );

        if (existingItem) {
            let itemAmount = existingItem.amount;
            existingItem.amount = +itemAmount + +amount;
            let itemPrice = existingItem.price;
            existingItem.price = (+itemPrice + +currency.price).toFixed(2);
            const portfolio = [...portfolioCurrencies];
            setPortfolioCurrencies(portfolio);
        } else {
            const portfolio = [...portfolioCurrencies, currency];
            setPortfolioCurrencies(portfolio);
        }
    };
    const removeCurrency = (id: string) => {
        setPortfolioCurrencies(
            portfolioCurrencies.filter((currency) => currency.id !== id)
        );
    };
    const setTotalPrice = (price: string) => {
        setTotalPortfolioPrice(price);
    };
    const updatePortfolio = async (id: string, amount: number) => {
        const response = await axios.get(
            `https://api.coincap.io/v2/assets/${id}`
        );
        const newCurrency: Currency = response.data.data;
        const newPrice = (+newCurrency.priceUsd * amount).toFixed(2);

        const updatedPortfolio = portfolioCurrencies.map((currency) => {
            if (currency.id === id) {
                return { ...currency, price: newPrice };
            } else {
                return currency;
            }
        });
        setPortfolioCurrencies(updatedPortfolio);
    };

    return (
        <PortfolioContext.Provider
            value={{
                portfolioCurrencies,
                addCurrency,
                removeCurrency,
                totalPortfolioPrice,
                setTotalPrice,
                updatePortfolio,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};
