import React from 'react';
import { Redirect } from '@reach/router';

import { IsLoggedIn, LoginForm } from '../containers/login';

const Login = () => (
  <IsLoggedIn>
    {({ data, client }) =>
      data.isLoggedIn ? <Redirect to="/" noThrow /> : <LoginForm />
    }
  </IsLoggedIn>
);

export default Login;