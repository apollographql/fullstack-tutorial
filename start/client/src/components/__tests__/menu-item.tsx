import React from 'react';

import { render, cleanup } from '../../test-utils';
import MenuItem from '../menu-item';
import { renderApollo } from '../../test-utils';

describe('Menu Item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    renderApollo(<MenuItem to="/wow" />);
  });
});
