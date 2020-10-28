import React from 'react';
import styled from 'react-emotion';
import { useApolloClient } from '@apollo/client';
import { isLoggedInVar } from '../chache';
import { menuItemClassName } from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

export default function LogoutButton() {
  const client = useApolloClient();
  return (
    <StyledButton
      onClick={() => {
        localStorage.clear();
        isLoggedInVar(false);
        window.location.href = '/';
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
}

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});
