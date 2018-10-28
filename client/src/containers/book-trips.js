import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_LAUNCH } from './cart-item';

const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
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

const BookTrips = ({ cartItems }) => (
  <Mutation
    mutation={BOOK_TRIPS}
    variables={{ launchIds: cartItems }}
    refetchQueries={cartItems.map(launchId => ({
      query: GET_LAUNCH,
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
);

export default BookTrips;
