import React from 'react';
import styled from 'react-emotion';
import { useApolloClient } from '@apollo/react-hooks';

import { menuItemClassName } from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

export default function LogoutButton() {
  const client = useApolloClient();
  return (
    <StyledButton
      data-testid="logout-button"
      onClick={() => {
        client.writeData({
          data: {
            isLoggedIn: false,
            cartItems: [],
          },
        });
        localStorage.setItem('token', '');
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});
