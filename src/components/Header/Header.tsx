import { Portfolio, PortfolioModal } from "components";
import { Currency } from "context";
import { motion } from "framer-motion";
import { useToggle } from "hooks";
import { Link, generatePath } from "react-router-dom";
import { ROUTE } from "router";
import { roundWithPrecision } from "utils";
import "./styles.scss";
import { useQuery } from "@apollo/client";
import { GET_ASSETS } from "apollo";

interface Props {
  onHoverVariant?: "small" | "medium" | "large";
}

export const Header = ({ onHoverVariant }: Props) => {
  const [isOpenModal, toggleModal] = useToggle();

  const { error, loading, data } = useQuery(GET_ASSETS, {
    variables: { limit: 3 },
  });

  const variants = {
    rest: { scale: 1 },
    small: { scale: 1.005 },
    medium: { scale: 1.01 },
    large: { scale: 1.02 },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const currencies = data.assets;

  return (
    <header className="header" data-cy="header">
      {loading && <p>Loading...</p>}
      <ul className="header-currencies" data-cy="header-currencies">
        {currencies.map(({ id, name, priceUsd }: Currency) => (
          <Link
            key={id}
            to={generatePath(ROUTE.HOME + ROUTE.DETAILS, {
              id: id,
            })}
          >
            <motion.li
              key={id}
              className="header-currencies__item"
              data-cy="header-currencies__item"
              variants={variants}
              initial="rest"
              whileHover={onHoverVariant}
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
