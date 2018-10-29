import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { LAUNCH_TILE_DATA } from './launches';
import ActionButton from '../containers/action-button';
import LaunchDetail from '../components/launch-detail';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      site
      rocket {
        id
        name
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launch = ({ launchId }) => (
  <Query query={GET_LAUNCH_DETAILS} variables={{ launchId }}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR: {error.message}</p>;

      return (
        <Fragment>
          <LaunchDetail {...data.launch} />
          <ActionButton {...data.launch} />
        </Fragment>
      );
    }}
  </Query>
);

export default Launch;
