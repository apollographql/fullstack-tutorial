import React from 'react';
import { render } from 'enzyme';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Cart from '../cart';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';

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

describe('Cart Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders with message for empty carts', () => {
    const wrapper = renderApollo(<Cart />, { cache });
    console.log( wrapper.debug());
    return waitForElement(() => wrapper.find('[data-testid="empty-message"]'));
//    return waitForElement(() => wrapper.find('empty-message'));
  });

  it('renders cart', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const wrapper = renderApollo(<Cart />, { cache, mocks });
    cartItemsVar(['1']);
    return waitForElement(() => wrapper.find('book-button'));
  });
});
