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

const updateWrapper = async (wrapper, time = 0) => {
  await act(async () => {
    await new Promise((res) => setTimeout(res, time));
    await wrapper.update();
  });
};


describe('Cart Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('should renders with message for empty carts', async() => {
    const wrapper = mount(
      <MockedProvider cache={cache} addTypename={false}>
       <Cart />
      </MockedProvider>,
    );

    await updateWrapper(wrapper);
    expect(wrapper.html()).toContain('No items in your cart');
  });

  it('should renders cart with Book All button', async() => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const wrapper = mount(
      <MockedProvider cache={cache} mocks={mocks} addTypename={false}>
       <Cart  />
      </MockedProvider>,
    );
    cartItemsVar(['1']);
    await updateWrapper(wrapper);
    expect(wrapper.html()).toContain('Book All');
  });

  it('should renders cart with My Cart heading label', async() => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const wrapper = mount(
      <MockedProvider cache={cache} mocks={mocks} addTypename={false}>
       <Cart  />
      </MockedProvider>,
    );
    cartItemsVar(['1']);
    await updateWrapper(wrapper);
    console.log(wrapper.html());
    expect(wrapper.html()).toContain("<h2>My Cart</h2>");
  });
});
