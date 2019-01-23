import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Launches from './launches';
import { PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Launches path="/" />
        </Router>
      </PageContainer>
    </Fragment>
  );
}
