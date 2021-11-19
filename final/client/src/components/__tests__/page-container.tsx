import React, {Fragment} from 'react';

import { render, cleanup } from '../../test-utils';
import PageContainer from '../page-container';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter : new Adapter()})

describe('Page Container', () => {
  it('renders with out exploding', () => {
    const wrapper = shallow(<PageContainer />);
    expect(wrapper.exists());
  });

  it('finds rendered fragment element', () => {
    const wrapper = shallow(<PageContainer props={"This prop worked"}/>);
    expect(wrapper.find("Fragment")).toBeTruthy();
  });

  it('finds rendered container element', () => {
    const wrapper = shallow(<PageContainer props={"This prop worked"}/>);
    expect(wrapper.find("container")).toBeTruthy();
  });


//   //automatically unmount and cleanup DOM after the test is finished.
//   afterEach(cleanup);
//
//   it('renders without error', () => {
//     render(<PageContainer />);
//   });
 });
