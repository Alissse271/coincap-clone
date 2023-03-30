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
    totalPortfolioPrice: '',
    addCurrency: () => {},
    removeCurrency: () => {},
    setTotalPrice: () => {},
});

export const PortfolioContextProvider = ({
    children,
}: ContextProviderProps) => {
    const [portfolioCurrencies, setPortfolioCurrencies] =
        useState<PortfolioCurrency[]>(portfolio);
    const [totalPortfolioPrice, setTotalPortfolioPrice] = useState<string>('');

    const addCurrency = (currency: PortfolioCurrency, amount: number) => {
        const existingItem = portfolioCurrencies.find(
            ({ name }) => name === currency.name
        );

        if (existingItem) {
            let itemAmount = existingItem.amount;
            existingItem.amount = +itemAmount + +amount;
            let itemPrice = existingItem.price;
            existingItem.price = (+itemPrice + +currency.price).toFixed(2);
        } else {
            const portfolio = [...portfolioCurrencies, currency];
            setPortfolioCurrencies(portfolio);
        }
    };
    const removeCurrency = (name: string) => {
        setPortfolioCurrencies(
            portfolioCurrencies.filter((currency) => currency.name !== name)
        );
    };
    const setTotalPrice = (price: string) => {
        setTotalPortfolioPrice(price);
    };

    return (
        <PortfolioContext.Provider
            value={{
                portfolioCurrencies,
                addCurrency,
                removeCurrency,
                totalPortfolioPrice,
                setTotalPrice,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};
