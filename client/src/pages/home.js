import React from 'react';
import styled from 'react-emotion';

import LaunchList from '../components/launch-list';

const Container = styled('header')({
  maxWidth: '720px',
  margin: '0 auto',
  width: '100%',
  // height: '48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

// const FullWidthContainer = styled('div')({
//   backgroundColor: '#00194b',
//   color: '#fff',
//   margin: '0',
//   width: '100%',
//   display: 'flex',
//   justifyContent: 'center',
// });

export default () => (
  <Container>
    <LaunchList />
  </Container>
);
