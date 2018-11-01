import React, { Fragment } from 'react';

import Header from '../components/header';
import TripsList from '../containers/trips-list';

export default function Profile() {
  return (
    <Fragment>
      <Header>My Trips</Header>
      <TripsList />
    </Fragment>
  );
};
