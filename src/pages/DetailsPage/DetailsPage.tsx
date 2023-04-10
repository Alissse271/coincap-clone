import { CurrencyDetails } from "components";
import { CurrencyContext } from "context";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_ASSET } from "apollo";

export const DetailsPage = () => {
  const { id = "" } = useParams<string>();
  const { fetchCurrencyDetails, currencyDetails, labels, chartData, fetchCurrencyHistory } =
    useContext(CurrencyContext);

  const { error, loading, data } = useQuery(GET_ASSET, {
    variables: { id: id },
  });

  useEffect(() => {
    fetchCurrencyHistory(id);
    // fetchCurrencyDetails(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return <CurrencyDetails currency={data.asset} labels={labels} chartData={chartData} />;
};
