import React from 'react';
import { InMemoryCache } from '@apollo/client';

import {
  renderApollo,
  cleanup,
  waitForElement,
  shallowEnzymeRender,
  fullEnzymeRender,
  sleep
} from '../../test-utils';
import Launches, { GET_LAUNCHES } from '../launches';

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

describe('Launches Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launches', async () => {
    const cache = new InMemoryCache({ addTypename: false });
    const mocks = [
      {
        request: { query: GET_LAUNCHES },
        result: {
          data: {
            launches: {
              cursor: '123',
              hasMore: true,
              launches: [mockLaunch],
            },
          },
        },
      },
    ];
    const launchesObj = await fullEnzymeRender(<Launches />, {
      mocks,
      cache,
    });
    expect(mocks[0].result.data.launches.cursor === '123');
    expect(mocks[0].result.data.launches.hasMore === true);
    expect(mocks[0].result.data.launches.launches[0].__typename === 'Launch');
    expect(mocks[0].result.data.launches.launches[0].id === 1);
    expect(mocks[0].result.data.launches.launches[0].isBooked === true);
    expect(mocks[0].result.data.launches.launches[0].isInCart === false);
    expect(mocks[0].result.data.launches.launches[0].mission.__typename);
    expect(mocks[0].result.data.launches.launches[0].mission.id === 1);
    expect(mocks[0].result.data.launches.launches[0].mission.missionPatch === '/');
    expect(mocks[0].result.data.launches.launches[0].mission.name === 'test mission');
    expect(mocks[0].result.data.launches.launches[0].site === 'earth');
    expect(mocks[0].result.data.launches.launches[0].rocket.__typename === 'Mission');
    expect(mocks[0].result.data.launches.launches[0].rocket.id === 1);
    expect(mocks[0].result.data.launches.launches[0].rocket.name === 'tester');
    expect(mocks[0].result.data.launches.launches[0].rocket.type === 'test');


  });
});
