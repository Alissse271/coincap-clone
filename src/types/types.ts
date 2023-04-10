import { gql } from "@apollo/client";

export interface Currency {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply?: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export type Currencies = {
  assets: Currency[];
};

export const GET_CURRENCIES = gql`
  query Currencies($limit: Int) {
    currencies(limit: $limit) {
      id
      rank
      symbol
      name
      supply
      maxSupply
      marketCapUsd
      volumeUsd24Hr
      priceUsd
      changePercent24Hr
      vwap24Hr
    }
  }
`;
