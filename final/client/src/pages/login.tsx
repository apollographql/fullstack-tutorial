import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { LoginForm, Loading } from '../components';
import { isLoggedInVar } from '../cache';
import * as LoginTypes from './__generated__/login';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default function Login() {
  const [login, { loading, error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login as string);
        isLoggedInVar(true);

        // TODO: This redirect is temporary. Eventually `makeLocalVar`
        // (which is used to create `isLoggedInVar`) will broadcast changes
        // which will result in the `IS_LOGGED_IN` query in `index.tsx`
        // automatically re-running, and refreshing the app to show the user
        // is logged in. For now though, this redirect will force the query to
        // re-run and show the logged in state.
        window.location.href = '/';
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
