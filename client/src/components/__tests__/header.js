import React from 'react';

import { render } from '../../test-utils';
import Header from '../header';

describe('Header', () => {
  it('renders without error', () => {
    render(<Header />);
  });
});
