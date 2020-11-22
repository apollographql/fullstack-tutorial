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

<<<<<<< HEAD
    const wrapper = renderApollo(<Cart />, { cache, mocks });
    
    cartItemsVar(['1']);
    expect(wrapper.find('book-button')).toBeTruthy();
=======
    const wrapper = renderApollo(<Cart />, { 
      mocks, 
      //addTypename: false, 
      cache 
    });
    console.log( wrapper.debug() )
    cartItemsVar(['1']);
    wrapper.update();
    console.log( cache );;
    return waitForElement(() => wrapper.find('book-button'));
>>>>>>> 51e15d5f5191fbc7853dcc2170e5fac290a42b2f
  });
});
