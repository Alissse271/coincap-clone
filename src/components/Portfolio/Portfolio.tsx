import './styles.scss';
import { portfolioIcon } from 'assets';

interface Props {
    toggleModal: () => void;
}

export const Portfolio = ({ toggleModal }: Props) => {
    const handleOpenModal = () => {
        toggleModal();
    };
    return (
        <div className="portfolio">
            <div className="portfolio-info">
                <p className="portfolio-info__item">Portfolio:</p>
                <p className="portfolio-info__item"> 134,32 USD</p>
                <p className="portfolio-info__item">+2,38</p>
                <p className="portfolio-info__item">(1,80%)</p>
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
