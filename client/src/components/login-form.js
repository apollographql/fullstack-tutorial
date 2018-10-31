import React, { Component } from 'react';
import styled from 'react-emotion';

import Button from './button';
import space from '../assets/space.png';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { colors, unit } from '../styles';

export default class LoginForm extends Component {
  onSubmit = event => {
    event.preventDefault();
    this.props.login({ variables: { email: event.target.email.value } });
  };

  render() {
    return (
      <Container>
        <Header>
          <Logo width={56} />
        </Header>
        <Rocket width={250} />
        <Heading>Space Explorer</Heading>
        <StyledForm onSubmit={this.onSubmit}>
          <StyledInput
            required
            type="email"
            name="email"
            placeholder="Email"
          />
          <Button type="submit">Log in</Button>
        </StyledForm>
      </Container>
    );
  }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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

const StyledForm = styled('form')({
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
  padding: `${unit * 1.25}px ${unit * 2.5}px`,
  border: `1px solid ${colors.grey}`,
  fontSize: 16,
  outline: 'none',
  ':focus': {
    borderColor: colors.primary,
  },
});
