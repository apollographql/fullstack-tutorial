import React from 'react';
import styled from 'react-emotion';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const BOOK_TRIP = gql`
  mutation book($launchId: ID!) {
    bookTrip(launchId: $launchId)
  }
`;

const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId)
  }
`;

export default ({
  launch: { id, mission, rocket, year },
  isLoggedIn,
  isBooked,
}) => {
  return (
    <Container>
      <img
        src={mission.missionPatch}
        style={{ height: '100px' }}
        alt={`Mission patch for ${mission.name}`}
      />
      <Content>
        <Title>
          <strong>Mission</strong>: {mission.name}, <em>{year}</em>
        </Title>
        <Description>
          <strong>Rocket</strong>: {rocket.name}
        </Description>

        {isLoggedIn ? (
          <Mutation mutation={isBooked ? CANCEL_TRIP : BOOK_TRIP}>
            {(book, { data }) => (
              <BookButton
                isBooked={isBooked}
                onClick={() => book({ variables: { launchId: id } })}
              >
                {isBooked ? 'Cancel Trip' : 'Book Trip'}
              </BookButton>
            )}
          </Mutation>
        ) : null}
      </Content>
    </Container>
  );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const BookButton = styled('button')(({ isBooked }) => ({
  backgroundColor: 'white',
  border: isBooked ? '1px solid #eb193e' : '1px solid #00194b',
  color: isBooked ? '#eb193e' : '#00194b',
  borderRadius: '3px',
  paddingTop: '8px',
  paddingBottom: '8px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  marginTop: '16px',
  ':hover': {
    backgroundColor: isBooked ? '#eb193e' : '#00194b',
    color: 'white',
  },
}));

const Container = styled('div')({
  border: '1px solid #ccc',
  borderRadius: '3px',
  // borderBottom: '2px solid #eb193e',
  margin: '32px 0',
  display: 'flex',
  flexDirection: 'row',
  padding: '16px',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
});

const Title = styled('p')({
  fontSize: '20px',
  fontWeight: '400',
  marginTop: 0,
});

const Description = styled('p')({
  margin: 0,
});

const Content = styled('div')({
  marginLeft: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
