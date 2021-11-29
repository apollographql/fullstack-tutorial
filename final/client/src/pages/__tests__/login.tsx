import React from 'react';

import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
} from '../../test-utils';
import { mount } from '../../enzyme';
import Login, {LOGIN_USER} from '../login';
import { cache, isLoggedInVar } from '../../cache';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { nextTick } from 'process';
import { act } from 'react-dom/test-utils';

// setup mocks here for unit tests
const mocks = [
  {
    request: {query: LOGIN_USER, variables: {email: 'a@a.a'}},
    result: {
      data: {
        login: {
          id: 'abc123',
          token: 'def456',
        },
      },
    },
  },
];

const updateWrapper = async (wrapper, time = 0) => {
  await act(async () => {
    await new Promise((res) => setTimeout(res, time));
    await wrapper.update();
  });
};

describe('Login Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders login page', async () => {
    mount(
    <MockedProvider mocks={mocks}>
    <Login />
    </MockedProvider>
    );
  });

  it('triggers login event and updates cache after done', async () => {
    // First check that we are not logged in
    expect(isLoggedInVar()).toBeFalsy();

    // Do full DOM render with mount using Enzyme
    const wrapper = mount(
      <MockedProvider 
        mocks={mocks}
        cache={cache}>  
          <Login />
        </MockedProvider>);
    await updateWrapper(wrapper);

    // Find email input and put mocked email
    const emailInput = wrapper.find('input');
    emailInput.simulate('change', { target: {value: 'a@a.a'}});
    
    // Find and click login button
    const loginButton = wrapper.find('button');
    expect(loginButton.text().includes('Log in')).toBeTruthy();
    wrapper.find('form').simulate('submit');
    await updateWrapper(wrapper);
    
    // Check that we are logged in 
    expect(isLoggedInVar()).toBeTruthy();
  });
});
