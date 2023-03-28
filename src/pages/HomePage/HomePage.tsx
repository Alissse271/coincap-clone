import { CryptocurrenciesList, PrimaryButton } from 'components';
import { CurrencyContext } from 'context';
import { useContext, useEffect } from 'react';
import './styles.scss';

export const HomePage = () => {
    const { showMoreCurrencies, fetchCurrencies, limit } =
        useContext(CurrencyContext);
    const handleShowMore = () => {
        showMoreCurrencies();
    };

    useEffect(() => {
        fetchCurrencies(limit);
    }, [limit]);
    return (
        <div className="container">
            <CryptocurrenciesList />
            <PrimaryButton
                type="button"
                label="View more"
                onClick={handleShowMore}
            />
        </div>
    );
};