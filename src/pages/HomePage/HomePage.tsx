import { CryptocurrenciesList, DefaultButton } from "components";
import { CurrencyContext } from "context";
import { useContext, useEffect } from "react";
import "./styles.scss";

export const HomePage = () => {
  const { showMoreCurrencies, fetchCurrencies, limit } = useContext(CurrencyContext);
  const handleShowMore = () => {
    showMoreCurrencies();
  };

  useEffect(() => {
    fetchCurrencies(limit);
  }, [limit]);
  return (
    <div className="container">
      <CryptocurrenciesList onHoverVariant="medium" />
      <DefaultButton primary type="button" label="View more" onClick={handleShowMore} />
    </div>
  );
};
