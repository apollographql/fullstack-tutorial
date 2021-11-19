import React from 'react';
import { render, cleanup } from '../../test-utils';
import LaunchDetail from '../launch-detail';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";


configure({adapter: new Adapter()})

describe('Launch Detail View', () => {

  it('renders without error', () => {
    const wrapper = shallow(<LaunchDetail />);
    expect(wrapper.exists())
    //renderApollo(<Footer />);
  });

  it('Passing site prop renders text', () => {
    const wrapper = shallow(<LaunchDetail
        id = {'2'}
        site={"Mars"}
        rocket={{name: 'Not a Tesla', type: 'uuugggeee',  __typename: 'Rocket', id: '2'}}
    />);
    expect(wrapper.find("h5").text()).toEqual("Mars");
    expect(wrapper.find("h3").text()).toEqual("Not a Tesla (uuugggeee)")
  });


  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

});
