import React from 'react';

import {
  renderApollo,
  cleanup,
  waitForElement,
  shallowEnzymeRender,
  fullEnzymeRender,
  sleep
} from '../../test-utils';
import Launch, { GET_LAUNCH_DETAILS } from '../launch';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
    type: 'test',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
  site: 'earth',
  isInCart: false,
};

describe('Launch Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launch', async () => {
    const mocks = [
      {
        request: { query: GET_LAUNCH_DETAILS, variables: { launchId: 1 } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    const launchObj = await fullEnzymeRender(<Launch launchId={1} />, {
      mocks,
      resolvers: {}
    });
    await sleep(0);
    expect(launchObj.find('MockedProvider').text()).toBe('logo.svg');
    expect(launchObj.get(0).key).toBe(null);
    expect(launchObj.get(0).type).not.toBe(null); 
    expect(mocks[0].result.data.launch.__typename === 'howsway');
    expect(mocks[0].result.data.launch.id === 1);
    expect(mocks[0].result.data.launch.isBooked === false);
    expect(mocks[0].result.data.launch.isInCart === false);
    expect(mocks[0].result.data.launch.site === 'earth');
  });
});
