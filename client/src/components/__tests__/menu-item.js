import React from 'react';

import { render } from '../../test-utils';
import MenuItem from '../menu-item';

describe('Menu Item', () => {
  it('renders without error', () => {
    render(<MenuItem to="/wow" />);
  });
});
