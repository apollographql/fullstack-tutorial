import React from 'react';

import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Launch, { GET_LAUNCH_DETAILS } from '../launch';

const all_wait = () => new Promise( resolve => setTimeout( resolve, 30 ));

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
    const wrapper = renderApollo(<Launch launchId={1} />, {
      mocks,
      resolvers: {}
    });
    await all_wait().then( () => {
      wrapper.update();
      //console.log( wrapper.debug() );
      expect(wrapper.text()).toMatch(/test mission/i);
      //expect(wrapper.text()).toMatch(/tost mission/i); //intentioally fail to test tests
    });
  });
});
