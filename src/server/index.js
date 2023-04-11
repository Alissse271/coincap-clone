import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { buildSchema } from "graphql";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVICES_COINCAP_API_BASE_URL;

const schema = buildSchema(`
type Asset {
  id: String!,
  rank: String!,
  symbol: String!,
  name: String!,
  supply: String!,
  maxSupply: String,
  marketCapUsd: String!,
  volumeUsd24Hr: String!,
  priceUsd: String!,
  changePercent24Hr: String!,
  vwap24Hr: String!
}

type AssetHistory {
  priceUsd: String!,
  time: Float!
}

type Query {
  assets(limit: Int = 20): [Asset],
  asset(id: String!): Asset
  assetHistory(id: String!): [AssetHistory]
}


`);

const app = express();
app.use(cors());

const root = {
  assets: async ({ limit }) => {
    try {
      const response = await axios.get(`${BASE_URL}?limit=${limit}`, {});
      return response.data.data;
    } catch (error) {
      console.error("Error fetching assets:", error.message);
      throw error;
    }
  },
  asset: async ({ id }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, {});
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching asset with id ${id}:`, error.message);
      throw error;
    }
  },
  assetHistory: async ({ id }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}/history?interval=d1`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching asset with id ${id}:`, error.message);
      throw error;
    }
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  }),
);

app.listen(5000, () => console.log("server started"));
