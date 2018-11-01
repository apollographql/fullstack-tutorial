import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import LaunchTile from '../components/launch-tile';
import { LAUNCH_TILE_DATA } from './launches-list';

const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default function TripsList() {
  return (
    <Query query={GET_MY_TRIPS} fetchPolicy="network-only">
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>ERROR: {error.message}</p>;
        if (!data.me.trips.length) return <p>You haven't booked any trips</p>;

        return data.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ));
      }}
    </Query>
  );
};
