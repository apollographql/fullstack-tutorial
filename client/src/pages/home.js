import React from 'react';
import styled from 'react-emotion';

import Launches from '../containers/launches';

export default () => (
  <Container>
    <Launches />
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
