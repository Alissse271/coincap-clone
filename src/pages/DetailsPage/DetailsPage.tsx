import { AddToPortfolioModal, PrimaryButton } from 'components';
import { useToggle } from 'hooks';
import './styles.scss';

export const DetailsPage = () => {
    const [isOpenModal, toggleModal] = useToggle();
    const handleOpenModal = () => {
        toggleModal();
    };
    return (
        <div className="details-container">
            <div className="details-container__column">
                <p className="details-container__item">
                    Bitcoin (BTC): $27,142.65
                </p>
                <p className="details-container__item">Change: -2.53%</p>
                <p className="details-container__item">Rank: 1</p>
            </div>

            <div className="details-container__column">
                <p className="details-container__item">Market Cap: $524.60b</p>
                <p className="details-container__item">Volume (24Hr): 1</p>
                <p className="details-container__item">Supply: 19.33m BTC</p>
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
    );
};
