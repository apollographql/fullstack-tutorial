import React from 'react';
import styled from 'react-emotion';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const Container = styled('div')({
  border: '1px solid black',
  margin: '32px 0',
});

const BOOK_TRIP = gql`
  mutation book($launchId: ID!) {
    bookTrip(launchId: $launchId)
  }
`;

export default ({ launch: { id, mission, rocket, year }, isLoggedIn }) => {
  return (
    <Container>
      <img
        src={mission.missionPatch}
        width="100px"
        alt={`Mission patch for ${mission.name}`}
      />
      <p>
        <strong>Mission</strong>:{mission.name}, <em>{year}</em>
      </p>
      <p>
        <strong>Rocket</strong>: {rocket.name}
      </p>

      {isLoggedIn ? (
        <Mutation mutation={BOOK_TRIP}>
          {(book, { data }) => (
            <button onClick={() => book({ variables: { launchId: id } })}>
              Book Trip
            </button>
          )}
        </Mutation>
      ) : null}
    </Container>
  );
};
