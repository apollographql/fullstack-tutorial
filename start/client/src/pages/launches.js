import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { LAUNCH_TILE_DATA } from './launch';
import {
  LaunchTile,
  Header,
  Button,
  Loading,
} from '../components';

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
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
      if (error) return <p>Error</p>;
      const launches = data.launches && data.luanches.launches;
      if (!launches) {
        return null;
      }

      return (
        <Fragment>
          <Header />
          { launches.map(launch => <LaunchTile key={launch.id} launch={launch} />) }
          { launches.hasMore && (
            <Button
              onClick={() =>
            fetchMore({
              variables: {
                after: data.luanches.cursor,
              },
              updateQuery: (prev, { fetchMoreResult, ...rest}) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  launches: {
                    ...fetchMoreResult.launches,
                      launches: [
                        ...prev.launches.launches,
                        ...fetchMoreResult.launches.launches
                      ],
                    },
                  };
                },
              })}>
              Load More
              </Button>
          )}
        </Fragment>
      )
    }}
    </Query>
  );
}