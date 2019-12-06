import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Header, Loading } from '../components';
import { CartItem, BookTrips } from '../containers';
import { RouteComponentProps } from '@reach/router';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

interface CartProps extends RouteComponentProps {}

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery(GET_CART_ITEMS);
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <Fragment>
      <Header>My Cart</Header>
      {!data.cartItems || !data.cartItems.length ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <Fragment>
          {data.cartItems.map(launchId => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
          <BookTrips cartItems={data.cartItems} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Cart;
