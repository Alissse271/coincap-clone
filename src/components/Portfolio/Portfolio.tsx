import './styles.scss';
import { portfolioIcon } from 'assets';
import { useContext, useEffect, useState } from 'react';
import { PortfolioContext } from 'context';

interface Props {
    toggleModal: () => void;
}

export const Portfolio = ({ toggleModal }: Props) => {
    const [portfolioCost, setPortfolioCost] = useState<string>('0.00');
    const { totalPortfolioPrice } = useContext(PortfolioContext);
    const handleOpenModal = () => {
        toggleModal();
    };

    useEffect(() => {
        const portfolioCost = JSON.parse(
            localStorage.getItem('portfolioCost') || '0.00'
        );
        setPortfolioCost(portfolioCost);
        localStorage.setItem(
            'portfolioCost',
            JSON.stringify(totalPortfolioPrice)
        );
    }, [portfolioCost]);

    const difference: string = String(
        (+totalPortfolioPrice - +portfolioCost).toFixed(2)
    );

    const percentageDifference: string = String(
        Math.abs((+portfolioCost / +totalPortfolioPrice) * 100 - 100).toFixed(3)
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
                    ({percentageDifference}%)
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
