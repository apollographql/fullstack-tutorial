import React from 'react';
import { shallow, mount, render } from '../../enzyme';

import { cleanup } from '../../test-utils';
import Button from '../button';

describe('Button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = render(<Button>Hello World</Button>);
  });
});
