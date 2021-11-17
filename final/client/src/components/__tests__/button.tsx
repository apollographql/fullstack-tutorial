import React from 'react';
import { shallow, mount } from 'enzyme';

import { render, cleanup } from '../../test-utils';
import Button from '../button';

describe('Button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<Button>Hello World</Button>);

    const wrapper = shallow((<Button>
      Hello World
    </Button>));//
 
  expect(wrapper.contains('Hello World')).toBe(true);
});
});
