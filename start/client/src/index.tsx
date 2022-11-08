import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from './cache';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Pages from './pages';
import injectStyles from './styles';

// Initialize ApolloClient
const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
});

injectStyles();

// Pass the ApolloClient instance to the ApolloProvider component

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
);