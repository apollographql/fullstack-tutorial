import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    ApolloProvider
  } from '@apollo/client';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import Pages from './pages';
  import injectStyles from './styles';
  
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
  });
  
  injectStyles();
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>,
    document.getElementById('root')
  );
  