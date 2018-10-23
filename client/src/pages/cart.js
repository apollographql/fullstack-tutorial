import React from 'react';
import PageContainer from '../components/page-container';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from '@reach/router';

import LaunchTile from '../components/launch-tile';

const CART_ITEMS_QUERY = gql`
  query Cart {
    cartItems @client
  }
`;

const LAUNCH_QUERY = gql`
  query LaunchTileQuery($launchId: ID!) {
    launch(id: $launchId) {
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
`;

const BOOK_TRIPS_MUTATION = gql`
  mutation bookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

export default () => (
  <PageContainer>
    <Query query={CART_ITEMS_QUERY}>
      {({ data: cartData, loading: cartLoading, error: cartError }) => {
        if (cartLoading) return <p>Loading...</p>;
        if (cartError) return <p>ERROR: {cartError.message}</p>;
        if (!cartData.cartItems || !cartData.cartItems.length) {
          return <Redirect to="/" />;
          // return <p>Cart is empty</p>;
        }

        return cartData.cartItems.map(launchId => {
          return (
            <div style={{ width: '100%' }}>
              <Query query={LAUNCH_QUERY} variables={{ launchId }}>
                {({ data, loading, error }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>ERROR: {error.message}</p>;
                  return data ? (
                    <LaunchTile launch={data.launch} isLoggedIn={true} />
                  ) : null;
                }}
              </Query>
              <Mutation
                mutation={BOOK_TRIPS_MUTATION}
                variables={{ launchIds: cartData.cartItems }}
                refetchQueries={cartData.cartItems.map(launchId => ({
                  query: LAUNCH_QUERY,
                  variables: { launchId },
                }))}
                update={cache => {
                  cache.writeData({ data: { cartItems: [] } });
                }}
              >
                {(bookTrips, { data, loading, error }) =>
                  data && data.bookTrips && !data.bookTrips.success ? (
                    <p>{data.bookTrips.message}</p>
                  ) : (
                    <button onClick={bookTrips}>Reserve</button>
                  )
                }
              </Mutation>
            </div>
          );
        });
      }}
    </Query>
  </PageContainer>
);
