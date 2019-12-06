import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './launch-tile';
import { LaunchDetails_launch } from '../pages/__generated__/LaunchDetails';

type LaunchDetailProps = Partial<LaunchDetails_launch>

const LaunchDetail: React.FC<LaunchDetailProps> = ({ id, site, rocket }) => (
  <Card
    style={{
      backgroundImage: getBackgroundImage(id as string),
    }}
  >
    <h3>
      {rocket && rocket.name} ({rocket && rocket.type})
    </h3>
    <h5>{site}</h5>
  </Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled('div')(cardClassName, {
  height: 365,
  marginBottom: unit * 4,
});

export default LaunchDetail;
