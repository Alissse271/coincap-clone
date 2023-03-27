import { portfolioIcon } from 'assets';
import { Button } from 'components/Button/Button';
import './styles.scss';

interface Props {
    isOpenModal: boolean;
    toggleModal: () => void;
}

export const PortfolioModal = ({ isOpenModal, toggleModal }: Props) => {
    const handleClose = () => {
        toggleModal();
    };
    return (
        <div className={`portfolio-background ${isOpenModal ? '' : 'none'}`}>
            <div className="portfolio">
                <div className="portfolio-header">
                    <h2 className="portfolio-title">Portfolio</h2>
                    <Button type="button" label="x" onClick={handleClose} />
                </div>

                <ul className="portfolio-list">
                    <li className="portfolio-list__item">
                        <div className="cryptocurrency-wrapper">
                            <img
                                src={portfolioIcon}
                                alt="BTC"
                                className="cryptocurrency-logo"
                            />
                            <div className="cryptocurrency-name">
                                <p>Bitcoin</p>
                                <p>BTC</p>
                            </div>
                        </div>
                        <div className="amount-wrapper">
                            <p>Amount</p>
                            <p>0.5</p>
                        </div>
                        <div className="price-wrapper">
                            <p>Price</p>
                            <p>27971.53</p>
                        </div>
                        <Button
                            type="button"
                            label="-"
                            onClick={() => console.log('remove')}
                        />
                    </li>
                </ul>
                <div className="portfolio-footer">
                    <p className="portfolio-footer__info">Total: $27971.53</p>
                </div>
            </div>
        </div>
    );
};
