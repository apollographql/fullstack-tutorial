import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import LoginForm from '../components/login-form';

const LOGIN_MUTATION = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default class Login extends Component {
  state = {
    email: ''
  };

  handleChange = event => {
    this.setState({ email: event.target.value });
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
            {(login, { data }) => <LoginForm login={login} />}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}
