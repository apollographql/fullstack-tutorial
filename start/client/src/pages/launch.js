import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/loading';
import Header from '../components/header';
import ActionButton from '../containers/action-button';
import LaunchDetail from '../components/launch-detail';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
      type
    }
    mission {
      name
      missionPatch
    }
  }
`;
export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
    }
  }
`;

export default function Launch({ launchId }) {
  return (
    <Query query={GET_LAUNCH_DETAILS} variables={{ launchId }}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <p>Error: {error.message}</p>;

        return (
          <Fragment>
            <Header image={data.launch.mission.missionPatch}>
              {data.launch.mission.name}
            </Header>
            <LaunchDetail {...data.launch} />
            <ActionButton {...data.launch} />
          </Fragment>
        );
      }}
    </Query>
  )
}