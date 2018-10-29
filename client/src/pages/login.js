import React from 'react';
import { Redirect } from '@reach/router';

import PageContainer from '../components/page-container';
import { IsLoggedIn, LoginForm } from '../containers/login';

export default () => (
  <PageContainer>
    <IsLoggedIn>
      {({ data, client }) =>
        data.isLoggedIn ? <Redirect to="/" noThrow /> : <LoginForm />
      }
    </IsLoggedIn>
  </PageContainer>
);