import React, { useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const TRIPS_QUERY = gql`
  query TripsQuery {
    totalTripsBooked
  }
`;

const TRIPS_SUBSCRIPTION = gql`
  subscription TripsSubscription {
    tripsBooked
  }
`;

function TripCounterInner(props: any) {
  useEffect(() =>
    props.subscribeToMore({
      document: TRIPS_SUBSCRIPTION,
      updateQuery: (
        prev: any,
        { subscriptionData }: { subscriptionData: any }
      ) => {
        const totalTripsBooked =
          prev.totalTripsBooked + subscriptionData.data.tripsBooked;
        return {
          ...prev,
          totalTripsBooked
        };
      }
    })
  )

  return <p>Trips booked: {props.tripsBooked}</p>
}

export default function TripCounter() {
  const { data, loading, error, subscribeToMore } = useQuery(TRIPS_QUERY);

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <TripCounterInner
      tripsBooked={data.totalTripsBooked}
      subscribeToMore={subscribeToMore}
    />
  )
}
