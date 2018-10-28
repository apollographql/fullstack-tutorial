import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export default ({ children, ...rest }) => (
  <Query query={IS_LOGGED_IN}>{props => children({ ...props, ...rest })}</Query>
);
