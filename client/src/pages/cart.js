import React from 'react';
import styled from 'react-emotion';
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
      {({ data: cartData, loading: cartLoading, error: cartError, client }) => {
        if (cartLoading) return <p>Loading...</p>;
        if (cartError) return <p>ERROR: {cartError.message}</p>;
        if (!cartData.cartItems || !cartData.cartItems.length)
          return <Redirect to="/" />;

        return cartData.cartItems.map(launchId => {
          return (
            <div style={{ width: '100%' }}>
              <Query query={LAUNCH_QUERY} variables={{ launchId }}>
                {({ data, loading, error }) => {
                  return !loading && !error && data ? (
                    <LaunchTile launch={data.launch} isLoggedIn={true} />
                  ) : null;
                }}
              </Query>
              <Mutation
                mutation={BOOK_TRIPS_MUTATION}
                variables={{ launchIds: cartData.cartItems }}
                onCompleted={data => {
                  if (!data.bookTrips.success) return;
                  client.writeData({ data: { cartItems: [] } });
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
