import React from 'react';

import { render } from '../../test-utils';
import LaunchDetail from '../launch-detail';

describe('Launch Detail View', () => {
  it('renders without error', () => {
    render(
      <LaunchDetail
        id={1}
        site={'earth'}
        rocket={{ name: 'that one', type: 'big' }}
      />,
    );
  });
});
