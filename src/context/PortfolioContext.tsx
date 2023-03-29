import { createContext, useState } from 'react';
import {
    ContextProviderProps,
    PortfolioCurrency,
    PortfolioCurrencyContextProps,
} from './types';

const portfolio: PortfolioCurrency[] = JSON.parse(
    localStorage.getItem('portfolio') || '[]'
);

export const PortfolioContext = createContext<PortfolioCurrencyContextProps>({
    portfolioCurrencies: portfolio,
    addCurrency: () => {},
    removeCurrency: () => {},
});

export const PortfolioContextProvider = ({
    children,
}: ContextProviderProps) => {
    const [portfolioCurrencies, setPortfolioCurrencies] =
        useState<PortfolioCurrency[]>(portfolio);

    const addCurrency = (currency: PortfolioCurrency, amount: number) => {
        const existingItem = portfolioCurrencies.find(
            ({ name }) => name === currency.name
        );
        if (existingItem) {
            setPortfolioCurrencies(
                portfolioCurrencies.map((item) =>
                    item.name === currency.name
                        ? { ...item, amount: item.amount + amount }
                        : item
                )
            );
        } else {
            setPortfolioCurrencies([
                ...portfolioCurrencies,
                { ...currency, amount },
            ]);
        }
        const portfolio = [...portfolioCurrencies, currency];
        setPortfolioCurrencies(portfolio);
    };
    const removeCurrency = (name: string) => {
        setPortfolioCurrencies(
            portfolioCurrencies.filter((currency) => currency.name !== name)
        );
    };

    return (
        <PortfolioContext.Provider
            value={{ portfolioCurrencies, addCurrency, removeCurrency }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};
