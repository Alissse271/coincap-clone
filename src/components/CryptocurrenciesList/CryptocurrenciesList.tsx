import { AddToPortfolioModal, Button, TableHead } from "components";
import { Currency, CurrencyContext, PortfolioCurrency } from "context";
import { motion } from "framer-motion";
import { useToggle, useWindowSize } from "hooks";
import { useCallback, useContext, useState } from "react";
import { generatePath, Link } from "react-router-dom";
import { ROUTE } from "router";
import { roundToBillion, roundWithPrecision, roundToMillion } from "utils";
import "./styles.scss";

interface Props {
  onHoverVariant?: "small" | "medium" | "large";
  currencies: Currency[];
}

export const CryptocurrenciesList = ({ onHoverVariant, currencies }: Props) => {
  const [currency, setCurrency] = useState<PortfolioCurrency>({
    id: "",
    name: "",
    symbol: "",
    amount: 0,
    price: "",
  });

  // const { currencies } = useContext(CurrencyContext);
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

  const variants = {
    rest: { scale: 1 },
    small: { scale: 1.005 },
    medium: { scale: 1.01 },
    large: { scale: 1.02 },
  };

  return (
    <>
      <main className="cryptocurrencies" data-cy="cryptocurrencies">
        <table className="cryptocurrencies-table">
          <TableHead primary size="medium" />
          <tbody className="cryptocurrencies-table__body">
            {currencies.map(
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
                  variants={variants}
                  initial="rest"
                  whileHover={onHoverVariant}
                  data-cy="cryptocurrencies-row"
                >
                  {width > 768 && <td>{rank}</td>}
                  <td>
                    <Link
                      to={generatePath(ROUTE.HOME + ROUTE.DETAILS, { id: id })}
                      data-cy="currency-link"
                    >
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
                      dataCy="button-add"
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
