import React from 'react';
import styled from 'react-emotion';
import { Link } from '@reach/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Container = styled('header')({
  maxWidth: '720px',
  width: '100%',
  height: '48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const FullWidthContainer = styled('div')({
  backgroundColor: '#00194b',
  color: '#fff',
  margin: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const StyledLink = styled(Link)({ textDecoration: 'none', color: 'white' });

const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;

export default class Header extends React.Component {
  logout = client => {
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
  };

  render() {
    return (
      <FullWidthContainer>
        <Container>
          <StyledLink to="/">
            <h1>Launches</h1>
          </StyledLink>
          <Query query={IS_LOGGED_IN}>
            {({ data: { isLoggedIn }, loading, error, client }) => {
              console.log({ isLoggedIn, loading, error, client });
              return !loading && !error && isLoggedIn ? (
                <button onClick={() => this.logout(client)}>Log Out</button>
              ) : (
                <StyledLink to="/login">Log In</StyledLink>
              );
            }}
          </Query>
        </Container>
      </FullWidthContainer>
    );
  }
}
