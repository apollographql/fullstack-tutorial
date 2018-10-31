import React from 'react';
import styled from 'react-emotion';
import { Link } from '@reach/router';

import galaxy from '../assets/images/galaxy.jpg';
import iss from '../assets/images/iss.jpg';
import moon from '../assets/images/moon.jpg';
import { unit } from '../styles';

const backgrounds = [galaxy, iss, moon];
export default ({ launch, index, isLoggedIn }) => {
  const { id, mission, rocket } = launch;
  return (
    <StyledLink to={`/launch/${id}`} style={{
      backgroundImage: `url(${backgrounds[index % backgrounds.length]})`
    }}>
      <h3>{mission.name}</h3>
      <h5>{rocket.name}</h5>
    </StyledLink>
  );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const padding = unit * 2;
const StyledLink = styled(Link)({
  display: 'block',
  height: 193,
  padding: `${unit * 4}px ${unit * 5}px`,
  marginTop: padding,
  borderRadius: 7,
  color: 'white',
  textDecoration: 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  ':not(:last-child)': {
    marginBottom: padding * 2,
  },
});
