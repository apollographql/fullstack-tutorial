import React from 'react';
import styled from 'react-emotion';
import { Link } from '@reach/router';
import { unit } from '../styles';

export default ({ launch, isLoggedIn }) => {
  const { id, mission } = launch;
  return (
    <StyledLink to={`/launch/${id}`}>
      <Image
        src={mission.missionPatch}
        alt={`Mission patch for ${mission.name}`}
      />
      <Title>{mission.name}</Title>
    </StyledLink>
  );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const padding = unit * 2;
const StyledLink = styled(Link)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding,
  marginTop: padding,
  border: '1px solid #ccc',
  borderRadius: 3,
  color: 'black',
  textDecoration: 'none',
  boxShadow: '0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23)',
  ':hover': {
    boxShadow: '0 3px 2px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  ':not(:last-child)': {
    marginBottom: padding * 2,
  },
});

const Image = styled('img')({
  height: 50
});

const Title = styled('p')({
  fontSize: 20,
  fontWeight: 400,
  marginTop: 0,
  margin: 0,
  marginLeft: unit * 2,
});
