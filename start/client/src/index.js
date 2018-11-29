import React from "react"
import ReactDOM from "react-dom"
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Pages from "./pages"
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, document.getElementById('root')
);
