import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';

const LaunchDetail = ({ mission, site, rocket }) => (
  <Container>
    <Image
      src={mission.missionPatch}
      alt={`Mission patch for ${mission.name}`}
    />
    <h2>{mission.name}</h2>
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
  </Container>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  marginBottom: unit * 2
});

const Image = styled('img')({
  width: 200
});

export default LaunchDetail;
