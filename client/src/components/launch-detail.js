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
      <h3>Site</h3>
      <p>{site}</p>

      <h3>Rocket</h3>
      <p>
        <strong>Name:</strong> {rocket.name}
      </p>
      <p>
        <strong>Type:</strong> {rocket.type}
      </p>
      <hr />
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
