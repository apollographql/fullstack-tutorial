import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import LaunchTile from './launch-tile';

const LIST_LAUNCHES = gql`
  query launchList($after: String) {
    isLoggedIn @client
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        year
        rocket {
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

export default class LaunchList extends React.Component {
  updateQuery = (prev, { fetchMoreResult }) => {
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
  };

  render() {
    return (
      <Query query={LIST_LAUNCHES}>
        {({ data, loading, error, fetchMore }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>ERROR</p>;

          return (
            <div>
              {data.launches && data.launches.launches
                ? data.launches.launches.map(l => (
                    <LaunchTile
                      key={l.id}
                      launch={l}
                      isLoggedIn={data.isLoggedIn}
                    />
                  ))
                : null}
              {data.launches && data.launches.hasMore ? (
                <button
                  onClick={() =>
                    fetchMore({
                      variables: {
                        after: data.launches.cursor,
                      },
                      updateQuery: this.updateQuery,
                    })
                  }
                >
                  Load More
                </button>
              ) : null}
            </div>
          );
        }}
      </Query>
    );
  }
}
