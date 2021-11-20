import React from 'react';

import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
  shallowEnzymeRender,
  fullEnzymeRender,
  sleep
} from '../../test-utils';
import BookTrips, { BOOK_TRIPS } from '../book-trips';
import { cartItemsVar } from '../../cache';
import { GET_LAUNCH } from '../cart-item';

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

describe('book trips', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const cartItemObj = fullEnzymeRender(<BookTrips cartItems={[]} />);

    expect(cartItemObj.find('button').text()).toBe("Book All");
  });

  it('completes mutation and shows message', async () => {
    let mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: ['1'] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: 'success!', launches: [] }],
          },
        },
      },
      {
        // we need this query for refetchQueries
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    const cartItemObj = fullEnzymeRender(
      <BookTrips cartItems={['1']} />,
      { mocks, addTypename: false },
    );
    
    cartItemObj.simulate('click');

    // Let's wait until our mocked mutation resolves and
    // the component re-renders.
    // getByTestId throws an error if it cannot find an element with the given ID
    // and waitForElement will wait until the callback doesn't throw an error
    await sleep(0);

    //console.log(cartItemObj.debug());

    expect(cartItemObj.find('button').text()).toBe("Book All");
    expect(cartItemObj.contains('[data-testid="message"]'));

  });

  // Verify cache is cleared
  it('correctly updates cache', () => {});

    //localStorage.setItem('cartItemsVar', '5');

    let mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: ['1'] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: 'success!', launches: [] }],
          },
        },
      },
      {
        // we need this query for refetchQueries
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    

    // render a trip with one cart item
    const cartItemObj = fullEnzymeRender(
      <BookTrips cartItems={['1']} />,
      { mocks, addTypename: false },
    );
    
    // Verify that there is something in the cart before clicking
    expect(cartItemsVar && cartItemsVar.length === 1);

    // Click and verify that the cart string data was cleared.
    cartItemObj.simulate('click');

    expect(!cartItemsVar || cartItemsVar.length === 0);
});
