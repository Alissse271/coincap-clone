import { LeftArrow } from 'assets';
import { AddToPortfolioModal, Chart, PrimaryButton } from 'components';
import { Currency } from 'context';
import { motion } from 'framer-motion';
import { useToggle } from 'hooks';
import { Link } from 'react-router-dom';
import { ROUTE } from 'router';

import { roundToBillion, roundToHundredths, roundToMillion } from 'utils';
import './styles.scss';

interface Props {
    currency: Currency;
    labels: string[];
    chartData: string[];
}

export const CurrencyDetails = ({ currency, labels, chartData }: Props) => {
    const {
        rank,
        supply,
        name,
        symbol,
        priceUsd,
        changePercent24Hr,
        marketCapUsd,
        volumeUsd24Hr,
    } = currency;

    const [isOpenModal, toggleModal] = useToggle();
    const handleOpenModal = () => {
        toggleModal();
    };

    return (
        <div className="details-wrapper">
            <Link to={ROUTE.HOME}>
                <LeftArrow />
            </Link>
            <motion.div
                className="details-container"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1.2 }}
            >
                <div className="details-container__column">
                    <p className="details-container__item">
                        {name} ({symbol}): ${roundToHundredths(priceUsd)}
                    </p>
                    <p className="details-container__item">
                        Change: {roundToHundredths(changePercent24Hr)}%
                    </p>
                    <p className="details-container__item">Rank: {rank}</p>
                </div>

                <div className="details-container__column">
                    <p className="details-container__item">
                        Market Cap: ${roundToBillion(marketCapUsd)}
                    </p>
                    <p className="details-container__item">
                        Volume (24Hr): ${roundToBillion(volumeUsd24Hr)}
                    </p>
                    <p className="details-container__item">
                        Supply: {roundToMillion(supply)} {symbol}
                    </p>
                    <PrimaryButton
                        type="button"
                        onClick={handleOpenModal}
                        label="Add to Portfolio"
                    />
                </div>
                <AddToPortfolioModal
                    isOpenModal={isOpenModal}
                    toggleModal={toggleModal}
                />
            </motion.div>
            <motion.div
                className="chart-wrapper"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1.0 }}
            >
                <Chart label={labels} chartData={chartData} name={name} />
            </motion.div>
        </div>
    );
};
