import { CurrencyDetails } from 'components';
import { CurrencyContext } from 'context';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const DetailsPage = () => {
    const { id = '' } = useParams();
    const { fetchCurrencyDetails, currencyDetails } =
        useContext(CurrencyContext);

    useEffect(() => {
        fetchCurrencyDetails(id);
    }, [id]);

    return <CurrencyDetails currency={currencyDetails} />;
};
