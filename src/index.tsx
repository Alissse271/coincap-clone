import { AppContext, PortfolioContextProvider, CurrencyContextProvider } from "context";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <AppContext components={[PortfolioContextProvider, CurrencyContextProvider]}>
      <App />
    </AppContext>
  </ApolloProvider>,
);
