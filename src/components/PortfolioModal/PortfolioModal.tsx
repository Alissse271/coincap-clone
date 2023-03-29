import { Button } from 'components/Button/Button';
import { PortfolioContext, PortfolioCurrency } from 'context';
import { useContext } from 'react';
import './styles.scss';

interface Props {
    isOpenModal: boolean;
    toggleModal: () => void;
}

export const PortfolioModal = ({ isOpenModal, toggleModal }: Props) => {
    const { portfolioCurrencies, removeCurrency } =
        useContext(PortfolioContext);
    const handleClose = () => {
        toggleModal();
    };
    const handleRemoveCurrency = (name: string) => {
        removeCurrency(name);
        localStorage.setItem('portfolio', JSON.stringify(portfolioCurrencies));
    };

    const totalAmount = portfolioCurrencies.reduce(
        (totalAmount, { price }) => totalAmount + +price,
        0
    );

    return (
        <div className={`portfolio-background ${isOpenModal ? '' : 'none'}`}>
            <div className="portfolio">
                <div className="portfolio-header">
                    <h2 className="portfolio-title">Portfolio</h2>
                    <Button type="button" label="x" onClick={handleClose} />
                </div>

                <ul className="portfolio-list">
                    {portfolioCurrencies?.map(
                        ({
                            name,
                            symbol,
                            amount,
                            price,
                        }: PortfolioCurrency) => (
                            <li key={name} className="portfolio-list__item">
                                <div className="cryptocurrency-wrapper">
                                    <div className="cryptocurrency-name">
                                        <p>{name}</p>
                                        <p>{symbol}</p>
                                    </div>
                                </div>
                                <div className="amount-wrapper">
                                    <p>Amount</p>
                                    <p>{amount}</p>
                                </div>
                                <div className="price-wrapper">
                                    <p>Price</p>
                                    <p>${price}</p>
                                </div>
                                <Button
                                    type="button"
                                    label="-"
                                    onClick={() => handleRemoveCurrency(name)}
                                />
                            </li>
                        )
                    )}
                </ul>
                <div className="portfolio-footer">
                    <p className="portfolio-footer__info">
                        Total: ${totalAmount.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};
