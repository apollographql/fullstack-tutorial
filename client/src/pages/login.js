import React, { Component, Fragment } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import { ReactComponent as Logo } from '../assets/logo.svg';

const LOGIN_MUTATION = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

const logoSize = 56;
export default class Login extends Component {
  state = { email: '' };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={LOGIN_MUTATION}
            onCompleted={({ login }) => {
              localStorage.setItem('token', login);
              client.writeData({ data: { isLoggedIn: true } });
            }}
          >
            {(login, { data }) => (
              <Fragment>
                <Logo width={logoSize} height={logoSize} />
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
              </Fragment>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}
