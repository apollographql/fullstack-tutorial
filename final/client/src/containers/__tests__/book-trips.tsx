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
    //const ecomp = renderApollo(<BookTrips cartItems={[]} />);
    const  ecomp  = render(
        <MockedProvider
        >
          {<BookTrips cartItems={[]} />}
        </MockedProvider>
    )
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
    
     
    /*const ecomp  = renderApollo(
      <BookTrips cartItems={['1']} />,
      { mocks, addTypename: false },
    );*/
//    wrapper = mount( <BookTrips cartItems={[]} />)
    wrapper  = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        {<BookTrips cartItems={[]} />}
      </MockedProvider>
  )
    console.log( wrapper );
    console.log( wrapper.state() );
    console.log( wrapper.props() );
    //wrapper.find('#submit').click();
    //console.log( wrapper.find('button') );
    wrapper.find('#submit').simulate('click');
    //fireEvent.click(wrapper.find('button'));

    // Let's wait until our mocked mutation resolves and
    // the component re-renders.
    // getByTestId throws an error if it cannot find an element with the given ID
    // and waitForElement will wait until the callback doesn't throw an error
    await waitForElement(() => wrapper.find( { prop: 'message'} ));
  });

  // >>>> TODO
  it('correctly updates cache', () => {});
});
