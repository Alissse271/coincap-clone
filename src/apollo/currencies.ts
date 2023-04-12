import { gql } from "@apollo/client";

export const GET_ASSETS = gql`
  query GetAssets($limit: Int) {
    assets(limit: $limit) {
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

export const GET_ASSET = gql`
  query GetAsset($id: String!) {
    asset(id: $id) {
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

export const GET_ASSET_HISTORY = gql`
  query GetAssetHistory($id: String!) {
    assetHistory(id: $id) {
      priceUsd
      time
    }
  }
`;
