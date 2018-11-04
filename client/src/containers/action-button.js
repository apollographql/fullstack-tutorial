import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';

// export all queries used in this file for testing
export { GET_LAUNCH_DETAILS };

export const TOGGLE_CART_MUTATION = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

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

const ActionButton = ({ isBooked, id, isInCart }) => (
  <Mutation
    mutation={isBooked ? CANCEL_TRIP : TOGGLE_CART_MUTATION}
    variables={{ launchId: id }}
    refetchQueries={[
      {
        query: GET_LAUNCH_DETAILS,
        variables: { launchId: id },
      },
    ]}
  >
    {mutate => (
      <div>
        <Button
          onClick={mutate}
          isBooked={isBooked}
          data-testid={'action-button'}
        >
          {isBooked
            ? 'Cancel This Trip'
            : isInCart
              ? 'Remove from Cart'
              : 'Add to Cart'}
        </Button>
      </div>
    )}
  </Mutation>
);

export default ActionButton;
