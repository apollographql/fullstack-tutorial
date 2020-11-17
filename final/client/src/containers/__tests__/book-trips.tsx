import React from 'react';

import { mount, shallow, render } from 'enzyme';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
} from '../../test-utils';
import BookTrips, { BOOK_TRIPS } from '../book-trips';
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
  let wrapper;

  it('renders without error', () => {
    const ecomp = renderApollo(<BookTrips cartItems={[]} />);
    /*const  ecomp  = mount(
        <MockedProvider
        >
          {<BookTrips cartItems={[]} />}
        </MockedProvider>
    )*/
    expect( ecomp.find('button') ).toBeTruthy();
    //expect(getByTestId('book-button')).toBeTruthy();
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
    
     
    const wrapper  = renderApollo(
      <BookTrips cartItems={['1']} />,
      { mocks, addTypename: false },
    );
    //wrapper  = render(
    //wrapper  = mount(
    //  <MockedProvider
    //    mocks={mocks}
    //    addTypename={false}
    //  >
    //    {<BookTrips cartItems={['1']} />}
    //  </MockedProvider>
    //)
    console.log( wrapper.find('book-button') );//.simulate('click');
    console.log( wrapper.debug());
    //console.log( wrapper.instance() );//.simulate('click');
    wrapper.find('button').simulate('click');
    
    // Let's wait until our mocked mutation resolves and
    // the component re-renders.
    // getByTestId throws an error if it cannot find an element with the given ID
    // and waitForElement will wait until the callback doesn't throw an error
    await waitForElement(() => wrapper.find( 'message' ));
  });

  // >>>> TODO
  it('correctly updates cache', () => {});
});
