import { CryptocurrenciesList, PrimaryButton } from 'components';
import './styles.scss';

export const HomePage = () => {
    return (
        <div>
            <CryptocurrenciesList />
            <PrimaryButton
                type="button"
                label="View more"
                onClick={() => console.log('view more')}
            />
        </div>
    );
};
