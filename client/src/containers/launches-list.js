import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import LaunchTile from '../components/launch-tile';
import Button from '../components/button';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
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

export default function LaunchesList() {
  return (
    <Query query={GET_LAUNCHES}>
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>ERROR</p>;

        return (
          <Fragment>
            {data.launches &&
              data.launches.launches &&
              data.launches.launches.map((l, index) => (
                <LaunchTile
                  key={l.id}
                  launch={l}
                  index={index}
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
};
