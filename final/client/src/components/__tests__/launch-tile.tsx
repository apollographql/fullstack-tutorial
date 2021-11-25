import React from 'react';

import { render, cleanup } from '../../test-utils';
import LaunchTile from '../launch-tile';
import {shallow} from "enzyme";

describe('Launch Tile', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = shallow(<LaunchTile
        launch={{
            __typename: 'Launch',
            isBooked: false,
            id: '1',
            mission: { name: 'Crew Dragon 1', __typename: 'Mission', missionPatch: null },
            rocket: { name: 'Falcon Heavy', __typename: 'Rocket', id: '1' },
        }}
    />);
    expect(wrapper.find('h3').text()).toBe('Crew Dragon 1');
    expect(wrapper.find('h5').text()).toBe('Falcon Heavy');
  });
});
