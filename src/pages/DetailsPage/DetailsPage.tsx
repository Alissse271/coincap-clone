import { CurrencyDetails } from "components";
import { CurrencyContext } from "context";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

export const DetailsPage = () => {
  const { id = "" } = useParams<string>();
  const { fetchCurrencyDetails, currencyDetails, labels, chartData, fetchCurrencyHistory } =
    useContext(CurrencyContext);

  useEffect(() => {
    fetchCurrencyHistory(id);
    fetchCurrencyDetails(id);
  }, [id]);

  return <CurrencyDetails currency={currencyDetails} labels={labels} chartData={chartData} />;
};
