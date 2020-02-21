import React from 'react';
import styled from 'react-emotion';

import { menuItemClassName } from '../components/menu-item';
import { isLoggedInVar } from '../cache';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

const LogoutButton = () => {
  return (
    <StyledButton
      data-testid="logout-button"
      onClick={() => {
        localStorage.clear();
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
