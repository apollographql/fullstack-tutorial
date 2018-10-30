import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { Link } from '@reach/router';
import { ApolloConsumer } from 'react-apollo';

import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as CartIcon } from '../assets/icons/cart.svg';
import { ReactComponent as ProfileIcon } from '../assets/icons/profile.svg';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';
import { colors, unit } from '../styles';

export default class Footer extends Component {
  logout = client => {
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
  };

  render() {
    return (
      <Container>
        <InnerContainer>
          <StyledLink to="/">
            <HomeIcon />
            Home
          </StyledLink>
          <StyledLink to="/cart">
            <CartIcon />
            Cart
          </StyledLink>
          <StyledLink to="/profile">
            <ProfileIcon />
            Profile
          </StyledLink>
          <ApolloConsumer>
            {client => (
              <StyledButton onClick={() => this.logout(client)}>
                <ExitIcon />
                Log out
              </StyledButton>
            )}
          </ApolloConsumer>
        </InnerContainer>
      </Container>
    );
  }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('footer')({
  flexShrink: 0,
  marginTop: 'auto',
  backgroundColor: 'white',
  color: colors.textSecondary,
  position: 'sticky',
  bottom: 0,
});

const InnerContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 420,
  padding: unit * 2.5,
  margin: '0 auto',
});

const menuItem = css({
  fontSize: 20,
  color: 'inherit',
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  textAlign: 'center',
  svg: {
    display: 'block',
    width: 60,
    margin: `0 auto ${unit}px`,
    fill: colors.secondary
  }
});

const StyledLink = styled(Link)(menuItem, {
  textDecoration: 'none',
});

const StyledButton = styled('button')(menuItem, {
  background: 'none',
  border: 'none',
  padding: 0,
});
