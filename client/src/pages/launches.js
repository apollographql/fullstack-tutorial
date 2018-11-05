import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { LaunchTile, Header, Button, Loading } from '../components';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
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
`;

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    isLoggedIn @client
    launches(after: $after) {
      cursor
      hasMore
      launches {
        isInCart @client
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default function Launches() {
  return (
    <Query query={GET_LAUNCHES}>
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <Loading />;
        if (error) return <p>ERROR</p>;

        return (
          <Fragment>
            <Header />
            {data.launches &&
              data.launches.launches &&
              data.launches.launches.map((l, index) => (
                <LaunchTile
                  key={l.id}
                  launch={l}
                  isLoggedIn={data.isLoggedIn}
                />
              ))}
            {data.launches && data.launches.hasMore ? (
              <Button
                onClick={() =>
                  fetchMore({
                    variables: {
                      after: data.launches.cursor,
                    },
                    updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                      if (!fetchMoreResult) return prev;
                      return {
                        ...fetchMoreResult,
                        launches: {
                          ...fetchMoreResult.launches,
                          launches: [
                            ...prev.launches.launches,
                            ...fetchMoreResult.launches.launches,
                          ],
                        },
                      };
                    },
                  })
                }
              >
                Load More
              </Button>
            ) : null}
          </Fragment>
        );
      }}
    </Query>
  );
}
