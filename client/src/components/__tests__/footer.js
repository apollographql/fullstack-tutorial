import React from 'react';

import { renderApollo, cleanup } from '../../test-utils';
import Footer from '../footer';

describe('Footer', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    renderApollo(<Footer />);
  });
});
