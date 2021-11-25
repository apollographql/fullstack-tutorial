import React from 'react';

import { render, cleanup } from '../../test-utils';
import LoginForm from '../login-form';
import {shallow} from "enzyme";
import {Button} from "../index";

describe('Login Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders heading and button without error', () => {
    const wrapper = shallow(<LoginForm login={() => {}}/>);
    expect(wrapper.html()).toContain('Space Explorer');
    expect(wrapper.html()).toContain('Log in');
  });
});
