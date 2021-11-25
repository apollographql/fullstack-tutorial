import React from 'react';

import { render, cleanup } from '../../test-utils';
import Header from '../header';
import {shallow} from "enzyme";

describe('Header', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h2').text()).toBe('Space Explorer');
  });
});
