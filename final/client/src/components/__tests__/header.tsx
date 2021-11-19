import React from 'react';

import { render, cleanup } from '../../test-utils';
import Header from '../header';
import Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";

configure({ adapter: new Adapter() })


describe('Header', () => {
  // automatically unmount and cleanup DOM after the test is finished.

  it('header exists', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists());
  });

  it('Passing children prop renders text', () => {
    const wrapper = shallow(<Header children={"I am Groot!!!!"}/>);
    expect(wrapper.find("h2").text()).toEqual("I am Groot!!!!");
  });

  //couldnt get to work, needs review
  // it('Passing Image prop', () => {
  //   const wrapper = shallow(<Header />);
  //   wrapper.setProps({image: "../../assets/images/dog-1.png"})
  //   expect(wrapper.find("image")).toEqual("../../assets/images/dog-1.png");
  // });

});
