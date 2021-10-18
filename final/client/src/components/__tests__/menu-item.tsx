import React from 'react';

import { shallow } from 'enzyme';

import { render, cleanup } from '../../test-utils';
import MenuItem from '../menu-item';
import Button from "../button";

describe('Menu Item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<MenuItem to="/wow" />);
  });

  it('renders Menu Item without error',  () => {
    const wrapper = shallow((
        <MenuItem to="home">
              Home
        </MenuItem>
    ));
    expect(wrapper.contains('Home')).toBe(true);
    expect(wrapper.props().to).toEqual('home');
  });
});
