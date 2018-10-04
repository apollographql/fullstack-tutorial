import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Router } from '@reach/router';

import Home from './pages/home';
import Login from './pages/login';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const client = new ApolloClient({
  uri: 'https://apollo-launchpad.glitch.me/',
});

/**
 * Render our app
 * - We wrap the whole app with ApolloProvider, so any component in the app can
 *    make GraphqL requests. Our provider needs the client we created above,
 *    so we pass it as a prop
 * - We need a router, so we can navigate the app. We're using Reach router for this.
 *    The router chooses between which component to render, depending on the url path.
 *    ex: localhost:3000/login will render only the `Login` component
 */
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Home path="/" />
      <Login path="login" />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
