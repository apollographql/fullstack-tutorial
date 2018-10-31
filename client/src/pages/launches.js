import React, { Fragment } from 'react';

import Header from '../components/header';
import LaunchesList from '../containers/launches-list';

export default function Launches() {
  return (
    <Fragment>
      <Header />
      <LaunchesList />
    </Fragment>
  )
}
