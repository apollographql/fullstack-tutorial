import React from 'react';
import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import CartItem, { GET_LAUNCH } from '../cart-item';

import waitForExpect from 'wait-for-expect';
const all_wait = () => new Promise( resolve => setTimeout( resolve, 10 ));

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

describe('cart item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  //afterEach(cleanup);
  it('queries item and renders without error',  async() => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    

    // since we know the name of the mission, and know that name
    // will be rendered at some point, we can use getByText
    const wrapper = renderApollo(<CartItem launchId={'1'} />, {
      mocks,
      addTypename: false,
    });

    console.log( wrapper.debug() );
    //console.log( wrapper.state() );
    expect( wrapper.find('[launchId="1"]').text() ).toMatch(/loading/i);
    await all_wait().then( () => {
      wrapper.update();
      console.log( wrapper.debug() );
      expect( wrapper.find('[launchId="1"]').text() ).toMatch(/test mission/i);
      //expect( wrapper.find('[launchId="1"]').text() ).toMatch(/tost mission/i); //intentionally fail tests
    });
  });
  
  it('renders with error state', async() => {
    let mocks = [
      {
        //request: { query: GET_LAUNCH, variables: { launchId: 1 } }, //No more mocked responses for the query error
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        error: new Error('aw shucks'),
      },
    ];

    // since we know the error message, we can use getByText
    // to recognize the error
    const wrapper = renderApollo(<CartItem launchId={'1'} />, {
      mocks,
      addTypename: false,
    });
    
    await all_wait().then( () => {
        //expect( wrapper.text() ).toMatch(/error: aw shocks/i); //intentionally fail tests
        expect( wrapper.text() ).toMatch(/error: aw shucks/i); 
      });
  });
});