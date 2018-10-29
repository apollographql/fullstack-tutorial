import React from 'react';
import { Redirect } from '@reach/router';
import styled from 'react-emotion';

import { IsLoggedIn, LoginForm } from '../containers/login';

export default () => (
  <Container>
    <IsLoggedIn>
      {({ data, client }) =>
        data.isLoggedIn ? <Redirect to="/" noThrow /> : <LoginForm />
      }
    </IsLoggedIn>
  </Container>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  maxWidth: '720px',
  margin: '0 auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 8px',
});
