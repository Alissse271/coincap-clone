import { CurrencyDetails } from "components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ASSET, GET_ASSET_HISTORY } from "apollo";
import { convertDate, roundWithPrecision } from "utils";

export const DetailsPage = () => {
  const { id = "" } = useParams<string>();

  const { error, loading, data } = useQuery(GET_ASSET, {
    variables: { id: id },
  });

  const {
    error: historyError,
    loading: historyLoading,
    data: historyData,
  } = useQuery(GET_ASSET_HISTORY, {
    variables: { id: id },
  });

  if (error || historyError) return <p>Error</p>;
  if (loading || historyLoading) return <p>Loading...</p>;

  const labels: string[] = historyData.assetHistory.map((x: any) => {
    return convertDate(x.time);
  });
  const chartData: string[] = historyData.assetHistory.map((x: any) => {
    return roundWithPrecision(x.priceUsd, 2);
  });

  return <CurrencyDetails currency={data.asset} labels={labels} chartData={chartData} />;
};
