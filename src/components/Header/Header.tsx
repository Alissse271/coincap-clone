import { Portfolio, PortfolioModal } from 'components';
import { useToggle } from 'hooks';
import './styles.scss';

export const Header = () => {
    const [isOpenModal, toggleModal] = useToggle();
    return (
        <header className="header">
            <ul className="header-currencies">
                <li className="header-currencies__item">Bitcoin: $27834.01</li>
                <li className="header-currencies__item">Ethereum: $1756.54</li>
                <li className="header-currencies__item">Tether: $1.00</li>
            </ul>
            <Portfolio toggleModal={toggleModal} />
            <PortfolioModal
                toggleModal={toggleModal}
                isOpenModal={isOpenModal}
            />
        </header>
    );
};
