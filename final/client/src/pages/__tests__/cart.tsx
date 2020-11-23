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

    expect(wrapper.find('[data-testid="empty-message"]')).toBeTruthy();
  });

  it('renders cart', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const wrapper = renderApollo(<Cart />, { 
      mocks, 
      //addTypename: false, 
      cache 
    });
    
    
    cartItemsVar(['1']);
    wrapper.update();
    console.log( cache );;
    return waitForElement(() => wrapper.find('book-button'));
  });
});
