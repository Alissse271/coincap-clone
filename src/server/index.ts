import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import {
  GraphQLFieldResolver,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import axios, { AxiosError } from "axios";

const app = express();
app.use(cors());

interface RootValue {
  assets: GraphQLFieldResolver<any, any, { limit: number }>;
  asset: GraphQLFieldResolver<any, any, { id: string }>;
  assetHistory: GraphQLFieldResolver<any, any, { id: string }>;
}

const rootValue: RootValue = {
  assets: async (_, { limit }, __) => {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets?limit=${limit}`, {});
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Failed to fetch currencies: ${axiosError.response?.statusText}`);
      }
      const genericError = error as Error;
      throw new Error(`Failed to fetch currencies: ${genericError.message}`);
    }
  },
  asset: async (_, { id }, __) => {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`, {});
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Failed to fetch currencies: ${axiosError.response?.statusText}`);
      }
      const genericError = error as Error;
      throw new Error(`Failed to fetch currencies: ${genericError.message}`);
    }
  },
  assetHistory: async (_, { id }, __) => {
    try {
      const response = await axios.get(
        `https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
      );
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Failed to fetch currencies: ${axiosError.response?.statusText}`);
      }
      const genericError = error as Error;
      throw new Error(`Failed to fetch currencies: ${genericError.message}`);
    }
  },
};

const AssetType = new GraphQLObjectType({
  name: "Asset",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    rank: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    supply: { type: new GraphQLNonNull(GraphQLString) },
    maxSupply: { type: GraphQLString },
    marketCapUsd: { type: new GraphQLNonNull(GraphQLString) },
    volumeUsd24Hr: { type: new GraphQLNonNull(GraphQLString) },
    priceUsd: { type: new GraphQLNonNull(GraphQLString) },
    changePercent24Hr: { type: new GraphQLNonNull(GraphQLString) },
    vwap24Hr: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (asset) => asset.vwap24Hr || "0",
    },
  }),
});

const AssetHistoryType = new GraphQLObjectType({
  name: "AssetHistory",
  fields: () => ({
    priceUsd: { type: new GraphQLNonNull(GraphQLString) },
    time: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

const schemaWithTypes = new GraphQLObjectType({
  name: "Query",
  fields: {
    assets: {
      type: new GraphQLList(AssetType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 10 },
      },
      resolve: rootValue.assets,
    },
    asset: {
      type: AssetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: rootValue.asset,
    },
    assetHistory: {
      type: new GraphQLList(AssetHistoryType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: rootValue.assetHistory,
    },
  },
});

const schema = new GraphQLSchema({
  query: schemaWithTypes,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.listen(5000, () => console.log("server started on port 5000"));
