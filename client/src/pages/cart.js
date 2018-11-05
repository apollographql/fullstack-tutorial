import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from '@reach/router';

import Header from '../components/header';
import Loading from '../components/loading';
import CartItem from '../containers/cart-item';
import BookTrips from '../containers/book-trips';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export default function Cart() {
  return (
    <Query query={GET_CART_ITEMS}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <p>ERROR: {error.message}</p>;
        if (!data.cartItems || !data.cartItems.length) {
          return (
            <Fragment>
              <Header>My Cart</Header>
              <p>No items in your cart</p>
            </Fragment>
          )
        }

        return (
          <Fragment>
            <Header>My Cart</Header>
            {data.cartItems.map(launchId => (
              <CartItem key={launchId} launchId={launchId} />
            ))}
            <BookTrips cartItems={data.cartItems} />
          </Fragment>
        );
      }}
    </Query>
  );
}
