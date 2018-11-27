import React from "react"
import ReactDOM from "react-dom"
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Launches from "./pages/launches"
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Launches />
  </ApolloProvider>, document.getElementById('root')
);
