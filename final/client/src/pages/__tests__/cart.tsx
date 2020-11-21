import React from 'react';

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
    //console.log( wrapper.debug());
    return expect( wrapper.text()).toMatch( /no items/i );
    //return expect( wrapper.text()).toMatch( /no atems/i ); //test test by failing
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
    console.log( wrapper.debug() )
    cartItemsVar(['1']);
    wrapper.update();
    console.log( cache );;
    return waitForElement(() => wrapper.find('book-button'));
  });
});
