import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import PageContainer from '../components/page-container';
import LaunchTile from '../components/launch-tile';

const PROFILE_QUERY = gql`
  query profile {
    me {
      id
      email
      trips {
        id
        isBooked
        rocket {
          id
          name
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
`;
// import LaunchList from '../components/launch-list';

export default () => (
  <PageContainer>
    <Query query={PROFILE_QUERY} fetchPolicy="network-only">
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>ERROR: {error.message}</p>;

        return (
          <div style={{ width: '100%' }}>
            <h3>Email</h3>
            <p>{data.me.email}</p>
            <h3>Trips</h3>
            {data.me.trips.length ? (
              data.me.trips.map(launch => <LaunchTile launch={launch} />)
            ) : (
              <p>You haven't booked any trips</p>
            )}
          </div>
        );
      }}
    </Query>
  </PageContainer>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */
