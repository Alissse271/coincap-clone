import { Header } from 'components';
import { Outlet } from 'react-router-dom';
import './styles.scss';

export const MainTemplate = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};
