import { AddToPortfolioModal, Chart, PrimaryButton } from 'components';
import { Currency } from 'context';
import { useToggle } from 'hooks';

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
            <div className="details-container">
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
            </div>
            <div className="chart-wrapper">
                <Chart label={labels} chartData={chartData} name={name} />
            </div>
        </div>
    );
};
