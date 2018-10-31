import React, { Fragment } from 'react';
import styled from 'react-emotion';

import Header from './header';
import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './launch-tile';

const LaunchDetail = ({ id, mission, site, rocket }) => (
  <Fragment>
    <Header image={mission.missionPatch}>{mission.name}</Header>
    <Card style={{
      backgroundImage: getBackgroundImage(id)
    }}>
      <h3>{rocket.name}</h3>
      <h5>{rocket.type}</h5>
      <p>{site}</p>
    </Card>
  </Fragment>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled('div')(cardClassName, {
  marginBottom: unit * 4
});

export default LaunchDetail;
