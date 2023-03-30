import './styles.scss';
import { portfolioIcon } from 'assets';
import { useContext, useEffect, useState } from 'react';
import { PortfolioContext } from 'context';
import { calcPercentageDifference } from 'utils';

interface Props {
    toggleModal: () => void;
}

export const Portfolio = ({ toggleModal }: Props) => {
    const [oldTotalPortfolioPrice, setOldTotalPortfolioPrice] =
        useState<string>('0.00');
    const { totalPortfolioPrice } = useContext(PortfolioContext);
    const handleOpenModal = () => {
        toggleModal();
    };

    useEffect(() => {
        const portfolioCost = JSON.parse(
            localStorage.getItem('portfolioCost') || '0.00'
        );
        setOldTotalPortfolioPrice(portfolioCost);
        localStorage.setItem(
            'portfolioCost',
            JSON.stringify(totalPortfolioPrice)
        );
    }, [oldTotalPortfolioPrice]);

    const difference: string = String(
        (+totalPortfolioPrice - +oldTotalPortfolioPrice).toFixed(2)
    );

    const percentageDifference: string = calcPercentageDifference(
        oldTotalPortfolioPrice,
        totalPortfolioPrice
    );

    return (
        <div className="portfolio">
            <div className="portfolio-info">
                <p className="portfolio-info__item">Portfolio:</p>
                <p className="portfolio-info__item">
                    {totalPortfolioPrice} USD
                </p>
                <p className="portfolio-info__item">
                    {+difference <= 0 ? `${difference}` : `+${difference}`}$
                </p>
                <p className="portfolio-info__item">
                    (
                    {+percentageDifference ? `${percentageDifference}` : `0.00`}
                    %)
                </p>
            </div>

            <button
                type="button"
                className="portfolio-button"
                onClick={handleOpenModal}
            >
                <img
                    src={portfolioIcon}
                    alt="Portfolio"
                    className="portfolio-button__image"
                />
            </button>
        </div>
    );
};
