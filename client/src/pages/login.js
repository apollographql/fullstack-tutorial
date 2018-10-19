import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from '@reach/router';
import styled from 'react-emotion';

import IsLoggedIn from '../components/logged-in';

const LOGIN_MUTATION = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default class Login extends React.Component {
  state = { email: '' };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Container>
        <IsLoggedIn>
          {({ data, client }) =>
            data.isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Mutation
                mutation={LOGIN_MUTATION}
                onCompleted={({ login }) => {
                  localStorage.setItem('token', login);
                  client.writeData({ data: { isLoggedIn: true } });
                }}
              >
                {(login, { data }) => (
                  <div>
                    <h1>Login</h1>
                    <form
                      onSubmit={event => {
                        event.preventDefault();
                        login({ variables: { email: this.state.email } });
                      }}
                    >
                      <label>
                        Email
                        <input
                          type="text"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </label>
                      <input type="submit" value="Login" />
                    </form>
                  </div>
                )}
              </Mutation>
            )
          }
        </IsLoggedIn>
      </Container>
    );
  }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  maxWidth: '720px',
  margin: '0 auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 8px',
});
