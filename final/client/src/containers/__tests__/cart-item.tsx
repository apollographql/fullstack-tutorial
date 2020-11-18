//import { findAllByAltText } from '@testing-library/react';
import React from 'react';



import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import CartItem, { GET_LAUNCH } from '../cart-item';

import waitForExpect from 'wait-for-expect';
import { act, wait } from '@testing-library/react';

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
  afterEach(cleanup);

  it('queries item and renders without error',  async () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    

    // since we know the name of the mission, and know that name
    // will be rendered at some point, we can use getByText
    let wrapper = renderApollo(<CartItem launchId={'1'} />, {
      mocks,
      addTypename: false,
    });

    // check the loading state
    //console.log( wrapper.debug());
    expect( wrapper.find('[launchId="1"]').text() ).toMatch(/loading/i);
    
    //this comes from the wait-for-expect library
    await waitForExpect( () => {
      wrapper.update();
      expect( wrapper.find('[launchId="1"]').text() ).toMatch(/test mission/i);
    });
    //return wrapper;
    //return waitForElement(() => wrapper.findWhere(x=>x.text().toUpperCase() === 'test mission'.toUpperCase() ));
//    return waitForElement(() => wrapper.findWhere(x=>x.text().toUpperCase() === 'test mission'.toUpperCase() ));
  });

  /*
  it('renders with error state', async () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: 1 } },
        error: new Error('aw shucks'),
      },
    ];

    // since we know the error message, we can use getByText
    // to recognize the error
    let wrapper2 = renderApollo(<CartItem launchId={'1'} />, {
      mocks,
      addTypename: false,
    });
    console.log( wrapper2.debug());
    console.log( wrapper2.find('[launchId="1"]').text());
    //wrapper.update();
    

    //waitForElement(() => wrapper.find(/error: aw shucks/i));
    //waitForElement(() => wrapper.findWhere(x=>x.text().toUpperCase() === 'error: aw shocks'.toUpperCase() ));
    return waitForElement( () => {
      wrapper2.findWhere(x=>x.text().toUpperCase() === 'error: aw shocks'.toUpperCase() );
    });
  });*/
});