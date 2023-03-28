import { CryptocurrenciesList, PrimaryButton } from 'components';
import { CurrencyContext } from 'context';
import { useContext } from 'react';
import './styles.scss';

export const HomePage = () => {
    const { showMoreCurrencies } = useContext(CurrencyContext);
    const handleShowMore = () => {
        showMoreCurrencies();
    };
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
