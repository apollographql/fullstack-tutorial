import React from 'react';

import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
} from '../../test-utils';
import { mount, render } from '../../enzyme';
import Login, {LOGIN_USER} from '../login';
import { cache, isLoggedInVar } from '../../cache';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { nextTick } from 'process';
import { act } from '@testing-library/react';

describe('Login Page', () => {
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

  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders login page', async () => {
    render(
    <MockedProvider mocks={mocks}>
    <Login />
    </MockedProvider>
    );
  });

  it('fires login mutation and updates cache after done', async () => {
    // First check that we are not logged in
    expect(isLoggedInVar()).toBeFalsy();

    // Do full DOM render with mount using Enzyme
    const wrapper = await mount(
      <MockedProvider 
        mocks={mocks}
        cache={cache}>  
          <Login />
        </MockedProvider>);

    // Find email input and put mocked email
    const emailInput = wrapper.find('input');
    emailInput.simulate('change', { target: {value: 'a@a.a'}});
    emailInput.instance().value = 'a@a.a';
    wrapper.update();
    console.log(emailInput.instance().value);
    
    // Find and click login button
    const loginButton = wrapper.find('button');
    expect(loginButton.text().includes('Log in')).toBeTruthy();
    loginButton.simulate('click');
    await new Promise(resolve => setTimeout(resolve))
    wrapper.update();
    
    // Check that we are logged in by finding the mocked email
    expect(isLoggedInVar()).toBeTruthy();
    expect(wrapper.text().includes('a@a.a')).toBeTruthy();
  });
});
