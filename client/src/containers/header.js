import React from 'react';
import styled from 'react-emotion';
import { Link } from '@reach/router';

import { IsLoggedIn } from './login';
import { colors, unit, maxWidth } from '../styles';

export default class Header extends React.Component {
  logout = client => {
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
  };

  render() {
    return (
      <Container>
        <InnerContainer>
          <StyledLink to="/">
            <h1>Launches</h1>
          </StyledLink>
          <IsLoggedIn>
            {({ data: { isLoggedIn }, loading, error, client }) => {
              return !loading && !error && isLoggedIn ? (
                <div>
                  <StyledLink to="/profile">Profile</StyledLink>
                  <StyledLink to="/cart">Cart</StyledLink>
                  <LogoutButton onClick={() => this.logout(client)}>
                    Log Out
                  </LogoutButton>
                </div>
              ) : (
                <StyledLink to="/login">Log In</StyledLink>
              );
            }}
          </IsLoggedIn>
        </InnerContainer>
      </Container>
    );
  }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('header')({
  backgroundColor: colors.primary,
  color: 'white',
});

const InnerContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth,
  height: 48,
  padding: `0 ${unit}px`,
  margin: '0 auto',
});

const LogoutButton = styled('button')({
  background: 'none',
  border: 'none',
  color: 'inherit',
  padding: 0,
  fontSize: 16,
  marginLeft: unit * 2,
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  ':not(:first-child)': {
    marginLeft: unit * 2,
  }
});
