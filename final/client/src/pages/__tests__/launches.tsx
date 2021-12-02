import React from 'react';
import { InMemoryCache } from '@apollo/client';
import Cart from '../cart';
import {act} from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';
import { shallow, mount, render } from '../../enzyme';
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

describe('Launches Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  
  it('should render launch page', async() => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    mount(
      <MockedProvider cache={cache} mocks={mocks} addTypename={false}>
       <Cart  />
      </MockedProvider>,
    );
  })
});

