import { Portal, PortalTarget } from 'components';
import { Button } from 'components/Button/Button';
import { PortfolioContext, PortfolioCurrency } from 'context';
import { useContext, useEffect } from 'react';
import './styles.scss';

interface Props {
    isOpenModal: boolean;
    toggleModal: () => void;
}

export const PortfolioModal = ({ isOpenModal, toggleModal }: Props) => {
    const {
        portfolioCurrencies,
        removeCurrency,
        totalPortfolioPrice,
        setTotalPrice,
        updatePortfolio,
    } = useContext(PortfolioContext);
    const handleClose = () => {
        toggleModal();
    };
    const handleRemoveCurrency = (id: string) => {
        removeCurrency(id);
    };

    const totalAmount = portfolioCurrencies
        .reduce((totalAmount, { price }) => totalAmount + +price, 0)
        .toFixed(2);

    useEffect(() => {
        setTotalPrice(totalAmount);
    }, [totalAmount]);

    useEffect(() => {
        portfolioCurrencies.map(({ id, amount }) =>
            updatePortfolio(id, amount)
        );
    }, []);

    useEffect(() => {
        if (isOpenModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isOpenModal]);

    return (
        <Portal target={PortalTarget.PORTFOLIO}>
            <div
                className={`portfolio-background ${isOpenModal ? '' : 'none'}`}
            >
                <div className="portfolio">
                    <div className="portfolio-header">
                        <h2 className="portfolio-title">Portfolio</h2>
                        <Button type="button" label="x" onClick={handleClose} />
                    </div>

                    <ul className="portfolio-list">
                        {portfolioCurrencies?.map(
                            ({
                                id,
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
                                        onClick={() => handleRemoveCurrency(id)}
                                    />
                                </li>
                            )
                        )}
                    </ul>
                    <div className="portfolio-footer">
                        <p className="portfolio-footer__info">
                            Total: ${totalPortfolioPrice}
                        </p>
                    </div>
                </div>
            </div>
        </Portal>
    );
};