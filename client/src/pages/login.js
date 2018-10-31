import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { css } from 'react-emotion';

import Button from '../components/button';
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
            {(login, { data }) => (
              <Container>
                <Header>
                  <Logo width={logoSize} />
                </Header>
                <Rocket width={250} />
                <Heading>Space Explorer</Heading>
                <StyledForm
                  onSubmit={event => {
                    event.preventDefault();
                    login({ variables: { email: event.target.email.value } });
                  }}
                >
                  <StyledInput
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <Button type="submit">Log in</Button>
                </StyledForm>
              </Container>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

const flexColumnCenter = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Container = styled('div')(flexColumnCenter, {
  flexGrow: 1,
  paddingBottom: unit * 6,
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
  marginBottom: unit * 5,
  padding: unit * 2.5,
  backgroundColor: colors.primary,
  svg: {
    margin: '0 auto'
  }
});

const Heading = styled('h1')({
  margin: `${unit * 3}px 0 ${unit * 6}px`
})

const StyledForm = styled('form')(flexColumnCenter, {
  width: '100%',
  maxWidth: 406,
  padding: unit * 3.5,
  borderRadius: 3,
  boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
  color: colors.text,
  backgroundColor: 'white',
});

const StyledInput = styled('input')({
  width: '100%',
  marginBottom: unit * 2,
  padding: `${unit}px ${unit * 2.5}px`,
  border: `1px solid ${colors.grey}`,
  fontSize: 16,
  outline: 'none',
  ':focus': {
    borderColor: colors.primary,
  },
});
