import { CurrencyContextProvider } from 'context';
import { RouterProvider } from 'react-router-dom';
import { Router } from 'router';
import './globalStyles.scss';

export const App = () => {
    return (
        <CurrencyContextProvider>
            <RouterProvider router={Router} />
        </CurrencyContextProvider>
    );
};
