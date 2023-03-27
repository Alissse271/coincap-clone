import { DetailsPage, HomePage, NotFoundPage } from 'pages';
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
} from 'react-router-dom';
import { MainTemplate } from 'templates';
import { ROUTE } from './routes';

export const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={ROUTE.HOME} element={<MainTemplate />}>
                <Route index element={<HomePage />} />
                <Route path={ROUTE.DETAILS} element={<DetailsPage />} />
            </Route>
            <Route path={ROUTE.NOT_FOUND} element={<NotFoundPage />} />
        </>
    ),
    { basename: '/coincap-clone' }
);
