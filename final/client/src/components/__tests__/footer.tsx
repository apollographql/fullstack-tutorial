import React from 'react';

import { renderApollo, cleanup } from '../../test-utils';
import Footer from '../footer';
import {MenuItem} from "../index";
import {shallow} from "enzyme";

describe('Footer', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(MenuItem)).toHaveLength(3);
  });
});
