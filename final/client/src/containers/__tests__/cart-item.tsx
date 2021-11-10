import React from 'react';

import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import CartItem, { GET_LAUNCH } from '../cart-item';
import { shallow, configure, mount, render  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';

configure({ adapter: new Adapter() })

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

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

  it('queries item and renders without error', done  => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    let wrapper = mount(<MockedProvider mocks={mocks}>
      <ApolloConsumer>
          {client => {
              client.stop = jest.fn();
              return <CartItem launchId={'1'}/>;
          }}
      </ApolloConsumer>
    </MockedProvider>);

    expect(wrapper.render().text().toLowerCase().includes('loading')).toBe(true);

    setTimeout( ()=>{
      wrapper.update();
      expect(wrapper.render().text().toLowerCase().includes('test mission')).toBe(true)
      done();
    },1000)

    //---replaced code for reference---
        // since we know the name of the mission, and know that name
    // will be rendered at some point, we can use getByText
    //const { getByText } = renderApollo(<CartItem launchId={'1'} />, {
    //  mocks,
    //  addTypename: false,
    //});
    // check the loading state
    //getByText(/loading/i);

    //return waitForElement(() => getByText(/test mission/i));
    //---end reference---
  });

  it('renders with error state', done => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: 1 } },
        error: new Error('aw shucks'),
      },
    ];

    //---replaced code for reference---
    // since we know the error message, we can use getByText
    // to recognize the error
    //const { getByText } = renderApollo(<CartItem launchId={'1'} />, {
    //  mocks,
    //  addTypename: false,
    //});

    //waitForElement(() => getByText(/error: aw shucks/i));
    //---end reference---

    let wrapper = mount(<MockedProvider mocks={mocks}>
      <ApolloConsumer>
          {client => {
              client.stop = jest.fn();
              return <CartItem launchId={'1'}/>;
          }}
      </ApolloConsumer>
    </MockedProvider>);

    setTimeout( ()=>{
      wrapper.update();
      expect(wrapper.render().text().toLowerCase().includes('error')).toBe(true);
      done();
    },1000)
  });
});