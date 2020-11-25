import React from 'react';

import { render, cleanup } from '../../test-utils';
import { shallow } from 'enzyme';
import LaunchTile from '../launch-tile';

import renderer from 'react-test-renderer';

describe('Launch Tile', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    shallow(
      <LaunchTile
//      <RaunchTile //A test to see the test fail to be sure our test can fail
        launch={{
          __typename: 'Launch',
          isBooked: false,
          id: '1',
          mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
          rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
        }}
      />,
    );
  });

  it('launch tile matches the snapshot', () => {
    const tree = renderer.create(
      <LaunchTile
        launch={{
          __typename: 'Launch',
          isBooked: false,
          id: '1',
          mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
          rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
        }}
      />, 
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
