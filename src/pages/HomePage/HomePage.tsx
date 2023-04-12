import { CryptocurrenciesList, DefaultButton } from "components";
import { useEffect, useState } from "react";
import "./styles.scss";
import { useQuery } from "@apollo/client";
import { GET_ASSETS } from "apollo";

export const HomePage = () => {
  const [limit, setLimit] = useState<number>(20);

  const { error, loading, data, fetchMore } = useQuery(GET_ASSETS, {
    variables: { limit },
  });

  const showMoreCurrencies = async () => {
    setLimit((prevLimit: number) => prevLimit + 10);
  };

  useEffect(() => {
    fetchMore({ variables: { limit: limit + 10 } });
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
          onClick={showMoreCurrencies}
          dataCy="view-more-button"
        />
      </>
    </div>
  );
};
