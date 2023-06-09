import "./styles.scss";
import { portfolioIcon } from "assets";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PortfolioContext } from "context";
import { calcPercentageDifference } from "utils";

interface Props {
  toggleModal: () => void;
}

export const Portfolio = ({ toggleModal }: Props) => {
  const [oldTotalPortfolioPrice, setOldTotalPortfolioPrice] = useState<string>("0.00");

  const { totalPortfolioPrice } = useContext(PortfolioContext);

  const handleOpenModal = useCallback(() => {
    toggleModal();
  }, []);

  useEffect(() => {
    const portfolioCost = JSON.parse(localStorage.getItem("portfolioCost") || "0.00");
    setOldTotalPortfolioPrice(portfolioCost);
  }, [oldTotalPortfolioPrice]);

  localStorage.setItem("portfolioCost", JSON.stringify(totalPortfolioPrice));

  const difference: string = useMemo(() => {
    const result = String((+totalPortfolioPrice - +oldTotalPortfolioPrice).toFixed(2));
    return result;
  }, [totalPortfolioPrice, oldTotalPortfolioPrice]);

  const percentageDifference: string = useMemo(() => {
    const result = calcPercentageDifference(oldTotalPortfolioPrice, totalPortfolioPrice);
    return result;
  }, [oldTotalPortfolioPrice, totalPortfolioPrice]);

  return (
    <div className="portfolio" data-cy="portfolio">
      <div className="portfolio-info" data-cy="portfolio-info">
        <p className="portfolio-info__item" data-cy="portfolio-info__item">
          Portfolio:
        </p>
        <p className="portfolio-info__item" data-cy="portfolio-info__item">
          {totalPortfolioPrice} USD
        </p>
        <p className="portfolio-info__item" data-cy="portfolio-info__item">
          {+difference <= 0 ? `${difference}` : `+${difference}`}$
        </p>
        <p className="portfolio-info__item" data-cy="portfolio-info__item">
          ({+percentageDifference ? `${percentageDifference}` : `0.00`}
          %)
        </p>
      </div>

      <button
        type="button"
        className="portfolio-button"
        onClick={handleOpenModal}
        data-cy="portfolio-button"
      >
        <img src={portfolioIcon} alt="Portfolio" className="portfolio-button__image" />
      </button>
    </div>
  );
};
