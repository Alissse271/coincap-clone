import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { buildSchema } from "graphql";
import axios from "axios";

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

type Query {
  assets(limit: Int = 20): [Asset],
  asset(id: String!): Asset
}
`);

const app = express();
app.use(cors());

const root = {
  assets: async ({ limit }) => {
    const response = await axios.get(`https://api.coincap.io/v2/assets?limit=${limit}`, {});
    return response.data.data;
  },
  asset: async ({ id }) => {
    console.log(id);
    const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`, {});
    return response.data.data;
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
