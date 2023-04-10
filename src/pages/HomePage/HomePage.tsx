import { CryptocurrenciesList, DefaultButton } from "components";
import { CurrencyContext } from "context";
import { useContext, useEffect } from "react";
import "./styles.scss";
import { useQuery } from "@apollo/client";
import { GET_ASSETS } from "apollo";

export const HomePage = () => {
  const { showMoreCurrencies, fetchCurrencies, limit } = useContext(CurrencyContext);
  const handleShowMore = () => {
    showMoreCurrencies();
  };

  const { error, loading, data, fetchMore } = useQuery(GET_ASSETS, {
    variables: { limit: 20 },
  });

  useEffect(() => {
    fetchCurrencies(limit);
  }, [limit]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const currencies = data.assets;

  return (
    <div className="container" data-cy="container">
      <>
        <CryptocurrenciesList onHoverVariant="medium" currencies={currencies} />
        <DefaultButton
          primary
          type="button"
          label="View more"
          onClick={handleShowMore}
          dataCy="view-more-button"
        />
      </>
    </div>
  );
};
