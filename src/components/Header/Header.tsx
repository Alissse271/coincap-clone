import { Portfolio } from 'components';
import './styles.scss';

export const Header = () => {
    return (
        <header className="header">
            <ul className="header-currencies">
                <li className="header-currencies__item">Bitcoin: $27834.01</li>
                <li className="header-currencies__item">Ethereum: $1756.54</li>
                <li className="header-currencies__item">Tether: $1.00</li>
            </ul>
            <Portfolio />
        </header>
    );
};
