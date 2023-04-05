import { AddToPortfolioModal, Button } from "components";
import { Currency, CurrencyContext, PortfolioCurrency } from "context";
import { motion } from "framer-motion";
import { useToggle, useWindowSize } from "hooks";
import { useCallback, useContext, useState } from "react";
import { generatePath, Link } from "react-router-dom";
import { ROUTE } from "router";
import { roundToBillion, roundWithPrecision, roundToMillion } from "utils";
import "./styles.scss";

export const CryptocurrenciesList = () => {
  const [currency, setCurrency] = useState<PortfolioCurrency>({
    id: "",
    name: "",
    symbol: "",
    amount: 0,
    price: "",
  });
  const { currencies } = useContext(CurrencyContext);
  const [isOpenModal, toggleModal] = useToggle();
  const { width = 0 } = useWindowSize();

  const handleSubmit = useCallback((id: string, name: string, symbol: string, price: string) => {
    const currency = {
      id: id,
      name: name,
      symbol: symbol,
      price: price,
      amount: 0,
    };
    setCurrency(currency);
    toggleModal();
  }, []);

  return (
    <>
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
                <motion.tr key={id} whileHover={{ scale: 1.01 }}>
                  {width > 768 && <td>{rank}</td>}
                  <td>
                    <Link to={generatePath(ROUTE.HOME + ROUTE.DETAILS, { id: id })}>
                      <div className="cryptocurrency-name">
                        <p>{name}</p>
                        <p>{symbol}</p>
                      </div>
                    </Link>
                  </td>
                  <td>${roundWithPrecision(priceUsd, 2)}</td>
                  {width > 768 && <td>${roundToBillion(marketCapUsd)}</td>}
                  {width > 1024 && (
                    <>
                      <td>${roundWithPrecision(vwap24Hr, 2)}</td>
                      <td>{roundToMillion(supply)}</td>
                    </>
                  )}

                  {width > 768 && <td>${roundToMillion(volumeUsd24Hr)}</td>}
                  <td>{roundWithPrecision(changePercent24Hr, 2)}%</td>
                  <td>
                    <Button
                      mode="add"
                      type="button"
                      label="+"
                      onClick={() => handleSubmit(id, name, symbol, priceUsd)}
                    />
                  </td>
                </motion.tr>
              ),
            )}
          </tbody>
        </table>
      </main>
      <AddToPortfolioModal
        isOpenModal={isOpenModal}
        toggleModal={toggleModal}
        currency={currency}
      />
    </>
  );
};
