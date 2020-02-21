import React, { useState } from 'react';
import { gql, useMutation, Reference } from '@apollo/client';

import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';
import { cartItemsVar } from '../cache';
import * as LaunchDetailTypes from '../pages/__generated__/LaunchDetails';

// export all queries used in this file for testing
export { GET_LAUNCH_DETAILS };

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

interface ActionButtonProps extends Partial<LaunchDetailTypes.LaunchDetails_launch> {}

const CancelTripButton: React.FC<ActionButtonProps> = ({ id }) => {
  const [mutate, { loading, error }] = useMutation(
    CANCEL_TRIP,
    {
      variables: { launchId: id },
      update(cache, { data: { cancelTrip } }) {
        // Update the users list of trips in the cache to remove the trip that
        // was just cancelled.
        const launch = cancelTrip.launches[0];
        cache.modify(
          `User:${localStorage.getItem('userId')}`,
          {
            trips(existingTrips, { toReference }) {
              const launchRef = toReference(launch);
              return existingTrips.filter(
                (tripRef: Reference) => tripRef === launchRef
              );
            }
          }
        );
      }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <Button
        onClick={() => mutate()}
        data-testid={'action-button'}
      >
        Cancel This Trip
      </Button>
    </div>
  );
};

const ToggleTripButton: React.FC<ActionButtonProps> = ({ id }) => {
  const cartItems = cartItemsVar();
  const isInCart = id ? cartItems.includes(id) : false;
  const [inCart, setInCart] = useState(isInCart);
  return (
    <div>
      <Button
        onClick={() => {
          if (id) {
            cartItemsVar(
              inCart
                ? cartItems.filter((i) => i !== id)
                : [...cartItems, id]
            );
            setInCart(!isInCart);
          }
        }}
        data-testid={'action-button'}
      >
        {inCart ? 'Remove from Cart' : 'Add to Cart'}
      </Button>
    </div>
  );
}

const ActionButton: React.FC<ActionButtonProps> =
  ({ isBooked, id }) => (
    isBooked ? <CancelTripButton id={id} /> : <ToggleTripButton id={id} />
  );

export default ActionButton;