import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'apollo-client';
import { gql } from 'graphql-tag';
import Pages from './pages';
import Login from './pages/login';
import { resolvers, typeDefs } from './resolvers';
import injectStyles from './styles';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  },
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

injectStyles();
ReactDOM.render(<ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({ data }) => (data.isLoggedIn ? <Pages /> : <Login />)}
    </Query>
</ApolloProvider>, document.getElementById('root'));
