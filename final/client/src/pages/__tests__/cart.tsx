import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import {
  renderApollo,
  cleanup,
  waitForElement,
  shallowEnzymeRender,
  fullEnzymeRender
} from '../../test-utils';
import Cart from '../cart';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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
    const cartObj = fullEnzymeRender(<Cart />, { cache });
    expect(cartObj.contains('[data-testid="message"]'));
    expect(cartObj.find('p').text()).toBe("No items in your cart");

  });

  it('renders cart', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const cartObj = fullEnzymeRender(<Cart />, { cache, mocks });
    cartItemsVar(['1']);

    expect(cartItemsVar && cartItemsVar.length === 1);
    expect(cartObj.find('h2').text()).toBe("My Cart");
    expect(cartObj.find('p').text()).toBe("No items in your cart");
  });
});
