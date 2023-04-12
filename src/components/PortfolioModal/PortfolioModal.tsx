import { Portal, PortalTarget } from "components";
import { Button } from "components/Button/Button";
import { PortfolioContext, PortfolioCurrency } from "context";
import { useCallback, useContext, useEffect, useMemo } from "react";
import "./styles.scss";
import { useLazyQuery } from "@apollo/client";
import { GET_ASSET } from "apollo";

interface Props {
  isOpenModal: boolean;
  toggleModal: () => void;
}

export const PortfolioModal = ({ isOpenModal, toggleModal }: Props) => {
  const {
    portfolioCurrencies,
    removeCurrency,
    totalPortfolioPrice,
    setTotalPrice,
    updatePortfolio,
  } = useContext(PortfolioContext);

  const [load, { data }] = useLazyQuery(GET_ASSET, {});

  const handleClose = useCallback(() => {
    toggleModal();
  }, []);
  const handleRemoveCurrency = (id: string) => {
    removeCurrency(id);
  };

  const totalAmount: string = useMemo(() => {
    const result = portfolioCurrencies
      .reduce((totalAmount, { price }) => totalAmount + +price, 0)
      .toFixed(2);
    return result;
  }, [portfolioCurrencies]);

  useEffect(() => {
    setTotalPrice(totalAmount);
  }, [totalAmount]);

  useEffect(() => {
    portfolioCurrencies.forEach(({ id }) => {
      load({ variables: { id: id } });
    });
  }, []);

  useEffect(() => {
    if (data) {
      portfolioCurrencies.forEach(({ id, amount }) => {
        updatePortfolio(data.asset, id, amount);
      });
    }
  }, [data]);

  useEffect(() => {
    if (isOpenModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpenModal]);

  return (
    <Portal target={PortalTarget.PORTFOLIO}>
      <div
        className={`portfolio-background ${isOpenModal ? "" : "none"}`}
        data-cy="portfolio-background"
      >
        <div className="portfolio">
          <div className="portfolio-header">
            <h2 className="portfolio-title">Portfolio</h2>
            <Button
              mode="cancel"
              type="button"
              label="x"
              onClick={handleClose}
              dataCy="button-cancel"
            />
          </div>

          {portfolioCurrencies.length ? (
            <ul className="portfolio-list" data-cy="portfolio-list">
              {portfolioCurrencies?.map(
                ({ id, name, symbol, amount, price }: PortfolioCurrency) => (
                  <li key={name} className="portfolio-list__item" data-cy="portfolio-list-item">
                    <div className="cryptocurrency-wrapper">
                      <div className="cryptocurrency-name">
                        <p data-cy="currency-name">{name}</p>
                        <p>{symbol}</p>
                      </div>
                    </div>
                    <div className="amount-wrapper">
                      <p>Amount</p>
                      <p data-cy="currency-amount">{amount}</p>
                    </div>
                    <div className="price-wrapper">
                      <p>Price</p>
                      <p>${price}</p>
                    </div>
                    <Button
                      mode="remove"
                      type="button"
                      label="-"
                      onClick={() => handleRemoveCurrency(id)}
                      dataCy="button-remove"
                    />
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p className="empty-block-text" data-cy="empty-block-text">
              Your portfolio is empty!
            </p>
          )}

          <div className="portfolio-footer">
            <p className="portfolio-footer__info">Total: ${totalPortfolioPrice}</p>
          </div>
        </div>
      </div>
    </Portal>
  );
};
