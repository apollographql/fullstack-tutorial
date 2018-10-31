import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import dog1 from '../assets/images/dog-1.png';
import dog2 from '../assets/images/dog-2.png';
import dog3 from '../assets/images/dog-3.png';

const max = 25; // 25 letters in the alphabet
const offset = 97; // letter A's charcode is 97
const avatars = [dog1, dog2, dog3];
const maxIndex = avatars.length - 1;
function pickAvatarByEmail(email) {
  const charCode = email.toLowerCase().charCodeAt(0) - offset;
  const percentile = Math.max(0, Math.min(max, charCode)) / max;
  return avatars[Math.round(maxIndex * percentile)];
}

export default function Header() {
  const email = atob(localStorage.getItem('token'));
  const avatar = pickAvatarByEmail(email);
  return (
    <Container>
      <Image src={avatar} alt="Space dog" />
      <div>
        <Heading>Space Explorer</Heading>
        <h5>{email}</h5>
      </div>
    </Container>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

const Image = styled('img')({
  height: 134,
  marginRight: unit * 2.5
});

const Heading = styled('h2')({
  marginBottom: unit / 2
});
