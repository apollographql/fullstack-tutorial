import React from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export const IsLoggedIn = ({ children, ...rest }) => (
  <Query query={IS_LOGGED_IN}>{props => children({ ...props, ...rest })}</Query>
);

export class LoginForm extends React.Component {
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
        )}
      </ApolloConsumer>
    );
  }
}
