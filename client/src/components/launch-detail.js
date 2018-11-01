import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './launch-tile';

const LaunchDetail = ({ id, site, rocket }) => (
  <Card style={{
    backgroundImage: getBackgroundImage(id)
  }}>
    <h3>{rocket.name}</h3>
    <h5>{rocket.type}</h5>
    <p>{site}</p>
  </Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled('div')(cardClassName, {
  height: 365,
  marginBottom: unit * 4
});

export default LaunchDetail;
