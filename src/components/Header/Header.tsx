import { Portfolio, PortfolioModal } from "components";
import { Currency, CurrencyContext } from "context";
import { motion } from "framer-motion";
import { useToggle } from "hooks";
import { useContext, useEffect } from "react";
import { Link, generatePath } from "react-router-dom";
import { ROUTE } from "router";
import { roundWithPrecision } from "utils";
import "./styles.scss";

export const Header = () => {
  const [isOpenModal, toggleModal] = useToggle();
  const { fetchBasicCurrencies, basicCurrencies } = useContext(CurrencyContext);

  useEffect(() => {
    fetchBasicCurrencies();
  }, []);
  return (
    <header className="header">
      <ul className="header-currencies">
        {basicCurrencies.map(({ id, name, priceUsd }: Currency) => (
          <Link
            key={id}
            to={generatePath(ROUTE.HOME + ROUTE.DETAILS, {
              id: id,
            })}
          >
            <motion.li
              key={id}
              className="header-currencies__item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {name}: ${roundWithPrecision(priceUsd, 2)}
            </motion.li>
          </Link>
        ))}
      </ul>
      <Portfolio toggleModal={toggleModal} />
      <PortfolioModal toggleModal={toggleModal} isOpenModal={isOpenModal} />
    </header>
  );
};
