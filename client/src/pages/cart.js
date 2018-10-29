import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from '@reach/router';

import CartItem from '../containers/cart-item';
import BookTrips from '../containers/book-trips';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const Cart = () => (
  <Query query={GET_CART_ITEMS}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR: {error.message}</p>;
      if (!data.cartItems || !data.cartItems.length) {
        return <Redirect to="/" noThrow />;
      }

      return (
        <div style={{ width: '100%' }}>
          {data.cartItems.map(launchId => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
          <BookTrips cartItems={data.cartItems} />
        </div>
      );
    }}
  </Query>
);

export default Cart;
