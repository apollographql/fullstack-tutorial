import React from 'react';
import styled from 'react-emotion';
import { useApolloClient } from '@apollo/client';

import { menuItemClassName } from '../components/menu-item';
import { isLoggedInVar } from '../cache';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

const LogoutButton = () => {
  const { cache } = useApolloClient();
  return (
    <StyledButton
      data-testid="logout-button"
      onClick={() => {
        // Since we're logging out, remove all traces of the current user
        // from the cache. First use `cache.modify()` to remove the stored
        // `me` reference that was added to the cache by the `GET_MY_TRIPS`
        // query in `profile.tsx`. Then trigger garbage collection using
        // `cache.gc()` to remove the cached `User` object that is no longer
        // reachable.
        cache.modify(
          'ROOT_QUERY',
          {
            me(_, { DELETE }) {
              return DELETE;
            }
          }
        );
        cache.gc();

        // Remove user details from localStorage.
        localStorage.clear();

        // Let other parts of the application that are relying on logged in
        // state know we're now logged out.
        isLoggedInVar(false);

        // TODO: This redirect is temporary. Eventually `makeLocalVar`
        // (which is used to create `isLoggedInVar`) will broadcast changes
        // which will result in the `IS_LOGGED_IN` query in `index.tsx`
        // automatically re-running, and refreshing the app to show the login
        // screen. For now though, this redirect will force the query to
        // re-run and show the login.
        window.location.href = '/';
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
}

export default LogoutButton;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});
