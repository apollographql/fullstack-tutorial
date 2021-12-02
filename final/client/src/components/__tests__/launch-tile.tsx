
import { shallow, mount, render } from '../../enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup } from '../../test-utils';
import LaunchTile from '../launch-tile';
import Launches from '../../pages/launches';

describe('Launch Tile', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
      <Launches/>
      </MockedProvider>,
    );
    it('renders without error enzyme method', () => {
      expect(wrapper.find('Card')).not.toBeNull();
      expect(wrapper.html()).toContain('Launch Tile');
    });
    let mocks = [
      {
        request: { query: LaunchTile, variables: { launchId: '1' } },
        result: { data: { launch: LaunchTile } },
      },
    ];

    render(
      <LaunchTile
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
});
