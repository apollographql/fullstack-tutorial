import React from 'react';

import { render, cleanup } from '../../test-utils';
import LaunchTile from '../launch-tile';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()})

describe('Launch Tile', () => {

  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  it('renders mission name', () => {
     const wrapper = shallow(<LaunchTile launch={{
         __typename: 'Launch',
         isBooked: true,
         id: '1',
         mission: { name: 'For All Mankind', __typename: 'Mission', missionPatch: null },
         rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
     }}/>);
     expect(wrapper.find("h3").text()).toEqual("For All Mankind");
  });

    it('renders empty mission name', () => {
        const wrapper = shallow(<LaunchTile launch={{
            __typename: 'Launch',
            isBooked: true,
            id: '1',
            mission: null,
            rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
        }}/>);
        expect(wrapper.find("h3").text()).toEqual("");
    });

    it('renders rocket name', () => {
        const wrapper = shallow(<LaunchTile launch={{
            __typename: 'Launch',
            isBooked: true,
            id: '1',
            mission: null,
            rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
        }}/>);
        expect(wrapper.find("h5").text()).toEqual("harambe");
    });

});
