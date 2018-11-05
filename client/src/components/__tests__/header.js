import React from 'react';

import { render, cleanup } from '../../test-utils';
import Header from '../header';

describe('Header', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<Header />);
  });
});
