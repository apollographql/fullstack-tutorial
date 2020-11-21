import React from 'react';
import { InMemoryCache } from '@apollo/client';

import {
  renderApollo,
  cleanup,
  waitForElement,
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

const all_wait = () => new Promise( resolve => setTimeout( resolve, 30 ));

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
      const wrapper = renderApollo(<Launches />, {
      mocks,
      addTypename: false,
      cache,
    }); 
    //console.log( wrapper.debug() );
    await all_wait().then( () => {
      wrapper.update();
      //console.log( wrapper.debug() );
      expect(wrapper.text()).toMatch(/test mission/i);
      //expect(wrapper.text()).toMatch(/tost mission/i); //intentioally fail to test tests
    });
    //await waitForElement(() => wrapper.find('tost mission'));
  });
});
