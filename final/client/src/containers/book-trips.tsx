import React from 'react';
import { gql, useMutation } from '@apollo/client';

import Button from '../components/button';
import { cartItemsVar } from '../cache';
import * as GetCartItemsTypes from '../pages/__generated__/GetCartItems';
import * as BookTripsTypes from './__generated__/BookTrips';

export const BOOK_TRIPS = gql`
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

interface BookTripsProps extends GetCartItemsTypes.GetCartItems {}

const BookTrips: React.FC<BookTripsProps> = ({ cartItems }) => {
  const [bookTrips, { data }] = useMutation<
    BookTripsTypes.BookTrips,
    BookTripsTypes.BookTripsVariables
  >(
    BOOK_TRIPS,
    {
      variables: { launchIds: cartItems },
    }
  );

  return data && data.bookTrips && !data.bookTrips.success
    ? <p data-testid="message">{data.bookTrips.message}</p>
    : (
      <Button
        onClick={async () => {
          await bookTrips();
          cartItemsVar([]);
        }}
        data-testid="book-button"
      >
        Book All
      </Button>
    );
}

export default BookTrips;