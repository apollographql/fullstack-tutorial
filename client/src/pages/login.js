import React from 'react';
import { Redirect } from '@reach/router';
import styled from 'react-emotion';

import { IsLoggedIn, LoginForm } from '../containers/login';

const Login = () => (
  <Container>
    <IsLoggedIn>
      {({ data, client }) =>
        data.isLoggedIn ? <Redirect to="/" /> : <LoginForm />
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

export default Login;
