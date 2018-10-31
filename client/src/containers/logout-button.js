import React, { Component } from 'react';
import styled from 'react-emotion';
import { ApolloConsumer } from 'react-apollo';

import { menuItemClassName } from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

export default class LogoutButton extends Component {
  logout = client => {
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <StyledButton onClick={() => this.logout(client)}>
            <ExitIcon />
            Logout
          </StyledButton>
        )}
      </ApolloConsumer>
    );
  }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});
