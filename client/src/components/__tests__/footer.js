import React from 'react';

import { renderApollo } from '../../test-utils';
import Footer from '../footer';

describe('Footer', () => {
  it('renders without error', () => {
    renderApollo(<Footer />);
  });
});
