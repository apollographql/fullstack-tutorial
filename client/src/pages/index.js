import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import Footer from '../components/footer';
import PageContainer from '../components/page-container';

export default function Pages() {
  return (
    <Fragment>
      <Router>
        <PageContainer path="/">
          <Launches default />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
        </PageContainer>
      </Router>
      <Footer />
    </Fragment>
  );
}
