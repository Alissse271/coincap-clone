import {
    AppContext,
    PortfolioContextProvider,
    CurrencyContextProvider,
} from 'context';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <AppContext
        components={[PortfolioContextProvider, CurrencyContextProvider]}
    >
        <App />
    </AppContext>
);
