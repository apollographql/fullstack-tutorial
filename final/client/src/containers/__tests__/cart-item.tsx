import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from '../../enzyme';
const {act} = TestRenderer;
import { render, wait, screen } from "@testing-library/react";

import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import CartItem, { GET_LAUNCH } from '../cart-item';

const updateWrapper = async (wrapper, time = 0) => {
  await act(async () => {
    await new Promise((res) => setTimeout(res, time));
    await wrapper.update();
  });
};

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

  it('should render loading state initially', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
       <CartItem launchId={'1'} />
      </MockedProvider>,
    );

    const tree = component.toJSON();
    expect(tree.children).toContain('Loading...');
  });

  it('should queries item and renders without error', async() => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    // since we know the name of the mission, and know that name
    // will be rendered at some point, we can use getByText
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
       <CartItem launchId={'1'} />
      </MockedProvider>,
    );

    await updateWrapper(wrapper);
    expect(wrapper.html()).toContain('test mission');

    // const p = wrapper.root.findByType('p');
    // expect(p.children.join('')).toContain('test mission');
  });

  it('renders with error state', async() => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: 1 } },
        error: new Error(),
      },
    ];

    // since we know the error message, we can use getByText
    // to recognize the error
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
       <CartItem launchId={'1'} />
      </MockedProvider>,
    );

    await updateWrapper(wrapper);
    expect(wrapper.html()).toContain('ERROR: No more mocked responses for the query');
  });
});