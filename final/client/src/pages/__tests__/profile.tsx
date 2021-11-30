import React from 'react';

import {
  cleanup,
  waitForElement,
} from '../../test-utils';
import Profile, { GET_MY_TRIPS } from '../profile';
import { mount } from '../../enzyme';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
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

describe('Profile Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders profile page without any trips booked', async () => {
    const mockMe = {
      __typename: 'User',
      id: 1,
      email: 'a@a.a',
      trips: [],
    };
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMe } },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
      <Profile  />
     </MockedProvider>,
    );

    // if the profile renders with no trips booked, the text will show
    await updateWrapper(wrapper);
    expect(wrapper.html()).toContain("You haven't booked any trips");
  });

  it('renders profile page with 1 trip booked', async () => {
    const mockMe = {
      __typename: 'User',
      id: 1,
      email: 'a@a.a',
      trips: [mockLaunch],
    };
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMe } },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
      <Profile  />
     </MockedProvider>,
    );

    // if the profile renders with a trip booked, the text will not show
    await updateWrapper(wrapper);
    expect(wrapper.html()).not.toContain("You haven't booked any trips");
  });
});