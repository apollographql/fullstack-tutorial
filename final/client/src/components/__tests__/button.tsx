import React from 'react';
import { render } from '../../enzyme';

import { cleanup } from '../../test-utils';
import Button from '../button';

describe('Button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('should render without error', () => {
    var wrapper = render(<Button>Hello World</Button>);
    expect(wrapper.html()).toContain('Hello World');
  });
});
