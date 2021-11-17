import React from 'react';
import { configure, shallow } from 'enzyme';
import { render, cleanup } from '../../test-utils';
import LaunchTile from '../launch-tile';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Launch Tile', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {

    const launchTileObj = shallow(<LaunchTile launch=
    {{
        __typename: 'Launch',
        isBooked: false,
        id: '1',
        mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
        rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
    }}/>);

    const launchTileObj2 = shallow(<LaunchTile launch=
      {{
        __typename: 'Launch',
        isBooked: false,
        id: '1',
        mission: null,
        rocket: { name: 'Team GeckOS', __typename: 'Rocket', id: '2' },
      }}/>);

    expect(launchTileObj.find('h3').text()).toEqual("the first one");
    expect(launchTileObj.find('h5').text()).toEqual("harambe");
    expect(launchTileObj2.find('h3').text()).toEqual("");
    expect(launchTileObj2.find('h5').text()).toEqual("Team GeckOS");
  });
});