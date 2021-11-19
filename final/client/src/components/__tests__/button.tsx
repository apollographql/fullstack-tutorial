import React from 'react';

import { render, cleanup } from '../../test-utils';
import Button from '../button';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
//new imports

configure({adapter: new Adapter})

describe('Button', () => {
  it('makes sure the button does not blow up', () => {
    const wrapper = shallow(<button />);
    expect(wrapper.exists())
  });

  // // automatically unmount and cleanup DOM after the test is finished.
  // afterEach(cleanup);
  //
  // it('renders without error', () => {
  //   render(<Button>Hello World</Button>);
  // });
});