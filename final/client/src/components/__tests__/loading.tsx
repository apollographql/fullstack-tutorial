import React from 'react';

import { render, cleanup } from '../../test-utils';
import Loading from '../loading';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()})

describe('Loading', () => {
  it('makes sure this loading component doesnt blow up', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.exists());
  });

  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

});
