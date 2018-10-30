import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import styled from 'react-emotion';

import Launch from './launch';
import Login from './login';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import Footer from '../containers/footer';
import { unit, colors } from '../styles';

const Bar = styled('div')({
  flexShrink: 0,
  height: 12,
  backgroundColor: colors.primary,
});

const Container = styled('div')({
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
  padding: unit * 3,
  paddingBottom: unit * 5
});

export default function Pages() {
  return (
    <Fragment>
      <Bar />
      <Container>
        <Router>
          <Launches path="/" />
          <Login path="login" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
        </Router>
      </Container>
      <Footer />
    </Fragment>
  );
}