import React, { Fragment, useEffect } from 'react';
import { Router } from '@reach/router';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const TRIPS_QUERY = gql`
  query TripsQuery {
    tripsBooked
  }
`;

const TRIPS_SUBSCRIPTION = gql`
  subscription TripsSubscription {
    tripsBooked
  }
`;

function TripCounterInner(props: any) {
  useEffect(() => props.subscribeToMore({
    document: TRIPS_SUBSCRIPTION,
    updateQuery: (prev: any, { subscriptionData }: { subscriptionData: any }) => ({
      ...prev,
      tripsBooked: prev.tripsBooked + subscriptionData.data.tripsBooked
    })
  }))

  return <p>Trips booked: {props.tripsBooked}</p>
}

function TripCounter() {
  const {data, loading, error, subscribeToMore} = useQuery(TRIPS_QUERY);

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <TripCounterInner
      tripsBooked={data.tripsBooked}
      subscribeToMore={subscribeToMore}
    />
  )
}

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <TripCounter />
        <Router primary={false} component={Fragment}>
          <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
