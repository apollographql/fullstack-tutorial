import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
} from '../../test-utils';
import ActionButton, {
  GET_LAUNCH_DETAILS,
  TOGGLE_CART,
} from '../action-button';
import { GET_CART_ITEMS } from '../../pages/cart';

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

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const { getByTestId } = renderApollo(<ActionButton />);
    expect(getByTestId('action-button')).toBeTruthy();
  });

  it('shows correct label', () => {
    const { getByText, container } = renderApollo(<ActionButton />);
    getByText(/add to cart/i);

    // rerender with different props to same container
    renderApollo(<ActionButton isInCart={true} />, { container });
    getByText(/remove from cart/i);

    // rerender with different props to same container
    renderApollo(<ActionButton isBooked={true} />, { container });
    getByText(/cancel this trip/i);
  });

  /**
   * This test is a bit tricky, since the button doesn't _render_
   * anything based on the response from the mutation.
   *
   * We test this by only mocking one mutation at a time. If the component
   * tried to execute any mutation not mocked, it would throw an
   * error
   */
  it('fires correct mutation with variables', async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GET_CART_ITEMS,
      data: { cartItems: [1] },
    });

    // if we only provide 1 mock, any other queries would cause error
    let mocks = [
      {
        request: { query: TOGGLE_CART, variables: { launchId: 1 } },
        result: { data: { addOrRemoveFromCart: true } },
      },
      {
        request: { query: GET_LAUNCH_DETAILS, variables: { launchId: 1 } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const { getByTestId, container, debug } = renderApollo(
      <ActionButton id={'1'} isBooked={false} />,
      {
        mocks,
        cache,
        resolvers: {}
      },
    );
    fireEvent.click(getByTestId('action-button'));
    await waitForElement(() => getByTestId('action-button'));

    // mocks = [
    //   {
    //     request: {
    //       query: CANCEL_TRIP,
    //       variables: { launchId: 1 },
    //     },
    //     result: {
    //       data: {
    //         cancelTrip: {
    //           success: true,
    //           message: '',
    //           launches: [{ id: 1, isBooked: false }],
    //         },
    //       },
    //     },
    //   },
    // ];

    // renderApollo(<ActionButton id={1} isBooked={true} />, { mocks, container });
    // fireEvent.click(getByTestId('action-button'));
    // await waitForElement(() => getByTestId('action-button'));
  });
});
