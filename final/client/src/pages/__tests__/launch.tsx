import React from 'react';
import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Cart from '../cart';
import {act} from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';
import { shallow, mount, render } from '../../enzyme';
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

    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    mount(
      <MockedProvider cache={cache} mocks={mocks} addTypename={false}>
       <Launch  />
      </MockedProvider>,
    );
  });


