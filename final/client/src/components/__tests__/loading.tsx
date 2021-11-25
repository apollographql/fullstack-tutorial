import React from 'react';

import { render, cleanup } from '../../test-utils';
import Loading from '../loading';
import {shallow} from "enzyme";

describe('Loading', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('should loading component without error', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toBeTruthy()
  });
});
