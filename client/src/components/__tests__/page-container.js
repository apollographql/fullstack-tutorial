import React from 'react';

import { render } from '../../test-utils';
import PageContainer from '../page-container';

describe('Page Container', () => {
  it('renders without error', () => {
    render(<PageContainer />);
  });
});
