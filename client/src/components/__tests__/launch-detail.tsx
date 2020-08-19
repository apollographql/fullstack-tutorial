import React from 'react';

import { render, cleanup } from '../../test-utils';
import LaunchDetail from '../launch-detail';

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(
      <LaunchDetail
        id={'1'}
        site={'earth'}
        rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
      />,
    );
  });
});
