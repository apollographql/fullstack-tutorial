import React from 'react';

import { render, cleanup } from '../../test-utils';
import MenuItem from '../menu-item';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter : new Adapter()})

describe('Menu Item', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<MenuItem to=""/>);
    expect(wrapper.exists());
  });

  // automatically unmount and cleanup DOM after the test is finished.
//   afterEach(cleanup);
//
//   it('renders without error', () => {
//     render(<MenuItem to="/wow" />);
//   });
 });
