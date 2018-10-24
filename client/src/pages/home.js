import React from 'react';
import styled from 'react-emotion';

import LaunchList from '../components/launch-list';

export default () => (
  <Container>
    <LaunchList />
  </Container>
);

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
