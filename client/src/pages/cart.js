import React, { Fragment } from 'react';

import Header from '../components/header';
import CartItems from '../containers/cart-items';

export default function Cart() {
  return (
    <Fragment>
      <Header>My Cart</Header>
      <CartItems />
    </Fragment>
  );
}
