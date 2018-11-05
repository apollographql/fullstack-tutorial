import React from 'react';

import { render } from '../../test-utils';
import Button from '../button';

describe('Button', () => {
  it('renders without error', () => {
    render(<Button>Hello World</Button>);
  });
});
