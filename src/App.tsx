import { CryptocurrenciesList, Header } from 'components';
import './globalStyles.scss';

export const App = () => {
    return (
        <div>
            <Header />
            <CryptocurrenciesList />
        </div>
    );
};
