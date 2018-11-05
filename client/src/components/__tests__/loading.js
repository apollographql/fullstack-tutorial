import React from 'react';

import { render } from '../../test-utils';
import Loading from '../loading';

describe('Loading', () => {
  it('renders without error', () => {
    render(<Loading />);
  });
});
