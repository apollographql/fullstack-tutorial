import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import galaxy from '../assets/images/galaxy.jpg';
import iss from '../assets/images/iss.jpg';
import moon from '../assets/images/moon.jpg';
import { unit } from '../styles';

const backgrounds = [galaxy, iss, moon];
export function getBackgroundImage(id: string) {
  return `url(${backgrounds[Number(id) % backgrounds.length]})`;
}

const tile = ({ launch }: any) => {
  const { id, mission, rocket } = launch;
  return (
    <StyledLink
      to={`/launch/${id}`}
      style={{
        backgroundImage: getBackgroundImage(id),
      }}
    >
      <h3>{mission.name}</h3>
      <h5>{rocket.name}</h5>
    </StyledLink>
  );
};

export default tile

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

export const cardClassName = css({
  padding: `${unit * 4}px ${unit * 5}px`,
  borderRadius: 7,
  color: 'white',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const padding = unit * 2;
const StyledLink = styled(Link)(cardClassName, {
  display: 'block',
  height: 193,
  marginTop: padding,
  textDecoration: 'none',
  ':not(:last-child)': {
    marginBottom: padding * 2,
  },
});
