import React from 'react';
import styled from 'react-emotion';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from '@reach/router';

export default ({ launch, isLoggedIn }) => {
  const { id, mission, rocket, isBooked } = launch;
  return (
    <StyledLink to={`/launch/${id}`}>
      <Container>
        <img
          src={mission.missionPatch}
          style={{ height: '50px' }}
          alt={`Mission patch for ${mission.name}`}
        />
        <Title>{mission.name}</Title>

        {/* {isLoggedIn ? ( */}
        {/* <Mutation
            mutation={isBooked ? CANCEL_TRIP : BOOK_TRIP}
            update={(cache, { data: { bookTrip, cancelTrip } }) => {
              // if there was an error making the query, cancel early
              if (
                (bookTrip && bookTrip.success) ||
                (cancelTrip && cancelTrip.success)
              )
                return;

              // find the updated launch from either the bookTrip or cancelTrip mutation
              const launch = (bookTrip || cancelTrip).launch;
              if (!launch) return;

              // update the launch in cache with the latest isBooked value
              cache.writeData({ data: { ...launch } });
            }}
          >
            {(book, { data, loading, error }) => {
              if (error) return <p>{error.message}</p>;
              if (loading) return <p>Loading...</p>;
              return (
                <BookButton
                  isBooked={isBooked}
                  onClick={() => book({ variables: { launchId: id } })}
                >
                  {isBooked ? 'Cancel Trip' : 'Book Trip'}
                </BookButton>
              );
            }}
          </Mutation>
        ) : null} */}
      </Container>
    </StyledLink>
  );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  border: '1px solid #ccc',
  borderRadius: '3px',
  margin: '32px 0',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '16px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23)',
  ':hover': {
    boxShadow: '0 3px 2px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'black',
  width: '100%',
});

const Title = styled('p')({
  fontSize: '20px',
  fontWeight: '400',
  marginTop: 0,
  margin: 0,
  marginLeft: '16px',
});
