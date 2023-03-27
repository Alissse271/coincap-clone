import { portfolioIcon } from 'assets';
import { Button } from 'components';
import { useWindowSize } from 'hooks';
import './styles.scss';

export const CryptocurrenciesList = () => {
    const { width = 0 } = useWindowSize();
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
                    <tr>
                        {width > 768 && <td>1</td>}
                        <td>
                            <div className="cryptocurrency-wrapper">
                                <img
                                    src={portfolioIcon}
                                    alt="BTC"
                                    className="cryptocurrency-logo"
                                />
                                <div className="cryptocurrency-name">
                                    <p>Bitcoin</p>
                                    <p>BTC</p>
                                </div>
                            </div>
                        </td>
                        <td>$27954.45</td>
                        {width > 768 && <td>$540.36b</td>}
                        {width > 1024 && (
                            <>
                                <td>$27952.85</td>
                                <td>19.33m</td>
                            </>
                        )}

                        {width > 768 && <td>$4.68b</td>}
                        <td>0.85%</td>
                        <td>
                            <Button
                                type="button"
                                label="+"
                                onClick={() => console.log('press')}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
};
