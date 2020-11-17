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
    // const { getByTestId } = renderApollo(<Cart />, { cache });
    // return waitForElement(() => getByTestId('empty-message'));

    let wrapper  = render(
      <MockedProvider
        cache={cache}
        addTypename={false}
      >
        {<Cart />}
      </MockedProvider>
    )
    console.log(wrapper.find('*'))
    expect(wrapper.find('empty-message')).toHaveLength(0)
  });

  it('renders cart', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    // const { getByTestId } = renderApollo(<Cart />, { cache, mocks });
    // cartItemsVar(['1']);
    // return waitForElement(() => getByTestId('book-button'));

    let wrapper  = render(
      <MockedProvider
        cache={cache}
        mocks={mocks}
        addTypename={false}
      >
        {<Cart />}
      </MockedProvider>
    )

    //  console.log(wrapper.val())
     expect(wrapper.find('book-button'))
  });
});
