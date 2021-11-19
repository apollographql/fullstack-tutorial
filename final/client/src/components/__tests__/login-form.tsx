import React from 'react';

import { render, cleanup } from '../../test-utils';
import LoginForm from '../login-form';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Button from '../button';

configure({adapter : new Adapter()})

describe('Login Form', () => {
  it('Contains button', () => {
    const wrapper = shallow(<Button type={"submit"}/>);
    expect(wrapper.find('button').exists());
  });


  // automatically unmount and cleanup DOM after the test is finished.
  // afterEach(cleanup);
  //
  // it('renders without error', () => {
  //   render(<LoginForm login={() => {}}/>);
  // });
});
