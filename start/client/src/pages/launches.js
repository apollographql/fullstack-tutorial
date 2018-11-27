import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import LaunchTile from '../components/launch-tile';
import Header from '../components/header';
import Button from '../components/button';
import Loading from '../components/loading';

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
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
                data.launches.hasMore && (
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
                )
              }
          </Fragment>
        );
      }}
    </Query>
  );
};
