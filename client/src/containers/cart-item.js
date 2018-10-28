import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import LaunchTile from '../components/launch-tile';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_LAUNCH = gql`
  query LaunchTileQuery($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const CartItem = ({ launchId }) => (
  <Query query={GET_LAUNCH} variables={{ launchId }}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR: {error.message}</p>;
      return data && <LaunchTile launch={data.launch} isLoggedIn={true} />;
    }}
  </Query>
);

export default CartItem;
