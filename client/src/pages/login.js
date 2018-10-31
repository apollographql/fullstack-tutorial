import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';

import space from '../assets/space.png';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { colors, unit } from '../styles';

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
              <Container>
                <Header>
                  <Logo width={logoSize} />
                </Header>
                <Rocket width={250} />
                <h1>Space Explorer</h1>
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
              </Container>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  color: 'white',
  backgroundColor: colors.primary,
  backgroundImage: `url(${space})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  svg: {
    display: 'block',
    fill: 'currentColor'
  }
});

const Header = styled('header')({
  width: '100%',
  padding: unit * 2.5,
  backgroundColor: colors.primary,
  svg: {
    margin: '0 auto'
  }
});
