import { selectHttpOptionsAndBody } from '@apollo/client';
import React from 'react';

import {
  renderApollo,
  cleanup,
  waitForElement,
  shallowEnzymeRender,
  fullEnzymeRender,
  sleep
} from '../../test-utils';
import CartItem, { GET_LAUNCH } from '../cart-item';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('cart item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('queries item and renders without error', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    // since we know the name of the mission, and know that name
    // will be rendered at some point, we can use getByText
    const cartObj = fullEnzymeRender(<CartItem launchId={'1'} />, {
      mocks,
      addTypename: false,
    });

    // check the loading state
    expect(cartObj.find('CartItem').text()).toBe("Loading...");
    expect(cartObj.find('CartItem').prop('launchId')).toBe("1");
  });

  it('renders with error state', async() => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        error: new Error('aw shucks'),
      },
    ];

    const cartObj = fullEnzymeRender(<CartItem launchId={'1'} />, {
      mocks,
      addTypename: false,
    });

    // Cause an error timeout
    // console.time("Slept for");
    await sleep(0);
    // console.timeEnd("Slept for");
    
     
    expect(cartObj.find('CartItem').text()).toBe("ERROR: aw shucks");
    expect(cartObj.find('CartItem').prop('launchId')).toBe("1");
  });
});