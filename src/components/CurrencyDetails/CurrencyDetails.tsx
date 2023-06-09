import { LeftArrow } from "assets";
import { AddToPortfolioModal, Chart, DefaultButton } from "components";
import { Currency, PortfolioCurrency } from "context";
import { motion } from "framer-motion";
import { useToggle } from "hooks";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "router";

import { roundToBillion, roundWithPrecision, roundToMillion } from "utils";
import "./styles.scss";

interface Props {
  currency: Currency;
  labels: string[];
  chartData: string[];
}

export const CurrencyDetails = ({ currency, labels, chartData }: Props) => {
  const {
    id,
    rank,
    supply,
    name,
    symbol,
    priceUsd,
    changePercent24Hr,
    marketCapUsd,
    volumeUsd24Hr,
  } = currency;

  const [currencyToSet, setCurrencyToSet] = useState<PortfolioCurrency>({
    id: "",
    name: "",
    symbol: "",
    amount: 0,
    price: "",
  });
  const [isOpenModal, toggleModal] = useToggle();

  const handleSubmit = useCallback((id: string, name: string, symbol: string, price: string) => {
    const currency = {
      id: id,
      name: name,
      symbol: symbol,
      price: price,
      amount: 0,
    };
    setCurrencyToSet(currency);
    toggleModal();
  }, []);

  return (
    <div className="details-wrapper" data-cy="details-wrapper">
      <Link to={ROUTE.HOME} data-cy="link-home">
        <LeftArrow />
      </Link>
      <motion.div
        className="details-container"
        data-cy="details-container"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.2 }}
      >
        <div className="details-container__column">
          <p className="details-container__item">
            {name} ({symbol}): ${roundWithPrecision(priceUsd, 2)}
          </p>
          <p className="details-container__item">
            Change: {roundWithPrecision(changePercent24Hr, 2)}%
          </p>
          <p className="details-container__item">Rank: {rank}</p>
        </div>

        <div className="details-container__column">
          <p className="details-container__item">Market Cap: ${roundToBillion(marketCapUsd)}</p>
          <p className="details-container__item">Volume (24Hr): ${roundToBillion(volumeUsd24Hr)}</p>
          <p className="details-container__item">
            Supply: {roundToMillion(supply)} {symbol}
          </p>
          <DefaultButton
            type="button"
            onClick={() => handleSubmit(id, name, symbol, priceUsd)}
            label="Add to Portfolio"
            size="large"
            dataCy="add-to-portfolio-button"
          />
        </div>
        <AddToPortfolioModal
          isOpenModal={isOpenModal}
          toggleModal={toggleModal}
          currency={currencyToSet}
        />
      </motion.div>
      <motion.div
        className="chart-wrapper"
        data-cy="chart-wrapper"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1.0 }}
      >
        <Chart label={labels} chartData={chartData} name={name} />
      </motion.div>
    </div>
  );
};
