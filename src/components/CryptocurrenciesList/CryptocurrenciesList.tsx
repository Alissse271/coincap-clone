import { AddToPortfolioModal, Button } from 'components';
import { Currency, CurrencyContext } from 'context';
import { motion } from 'framer-motion';
import { useToggle, useWindowSize } from 'hooks';
import { useContext } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE } from 'router';
import { roundToBillion, roundToHundredths, roundToMillion } from 'utils';
import './styles.scss';

export const CryptocurrenciesList = () => {
    const [isOpenModal, toggleModal] = useToggle();
    const { width = 0 } = useWindowSize();
    const handleOpenModal = () => {
        toggleModal();
    };
    const { currencies } = useContext(CurrencyContext);
    return (
        <main className="cryptocurrencies">
            <table className="cryptocurrencies-table">
                <thead className="cryptocurrencies-table__head">
                    <tr>
                        {width > 768 && <th>Rank</th>}
                        <th>Name</th>
                        <th>Price</th>
                        {width > 768 && <th>Market Cap</th>}
                        {width > 1024 && (
                            <>
                                <th>VWAP (24Hr)</th>
                                <th>Supply</th>
                            </>
                        )}
                        {width > 768 && <th>Volume (24Hr)</th>}
                        <th>Change (24Hr)</th>
                        <th>Add</th>
                    </tr>
                </thead>

                <tbody className="cryptocurrencies-table__body">
                    {currencies?.map(
                        ({
                            id,
                            rank,
                            symbol,
                            name,
                            supply,
                            marketCapUsd,
                            volumeUsd24Hr,
                            priceUsd,
                            changePercent24Hr,
                            vwap24Hr,
                        }: Currency) => (
                            <motion.tr
                                key={id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {width > 768 && <td>{rank}</td>}
                                <td>
                                    <Link
                                        to={generatePath(
                                            ROUTE.HOME + ROUTE.DETAILS,
                                            { id: id }
                                        )}
                                    >
                                        <div className="cryptocurrency-name">
                                            <p>{name}</p>
                                            <p>{symbol}</p>
                                        </div>
                                    </Link>
                                </td>
                                <td>${roundToHundredths(priceUsd)}</td>
                                {width > 768 && (
                                    <td>${roundToBillion(marketCapUsd)}</td>
                                )}
                                {width > 1024 && (
                                    <>
                                        <td>${roundToHundredths(vwap24Hr)}</td>
                                        <td>{roundToMillion(supply)}</td>
                                    </>
                                )}

                                {width > 768 && (
                                    <td>${roundToMillion(volumeUsd24Hr)}</td>
                                )}
                                <td>{roundToHundredths(changePercent24Hr)}%</td>
                                <td>
                                    <Button
                                        type="button"
                                        label="+"
                                        onClick={handleOpenModal}
                                    />
                                </td>
                            </motion.tr>
                        )
                    )}
                </tbody>
            </table>
            <AddToPortfolioModal
                isOpenModal={isOpenModal}
                toggleModal={toggleModal}
            />
        </main>
    );
};
