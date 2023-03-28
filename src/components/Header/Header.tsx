import { Portfolio, PortfolioModal } from 'components';
import { Currency, CurrencyContext } from 'context';
import { useToggle } from 'hooks';
import { useContext, useEffect } from 'react';
import { roundToHundredths } from 'utils';
import './styles.scss';

export const Header = () => {
    const [isOpenModal, toggleModal] = useToggle();
    const { fetchBasicCurrencies, basicCurrencies } =
        useContext(CurrencyContext);

    useEffect(() => {
        fetchBasicCurrencies();
    }, []);
    return (
        <header className="header">
            <ul className="header-currencies">
                {basicCurrencies.map(({ id, name, priceUsd }: Currency) => (
                    <li key={id} className="header-currencies__item">
                        {name}: ${roundToHundredths(priceUsd)}
                    </li>
                ))}
            </ul>
            <Portfolio toggleModal={toggleModal} />
            <PortfolioModal
                toggleModal={toggleModal}
                isOpenModal={isOpenModal}
            />
        </header>
    );
};