import React from 'react';
import LogoutButton from '../logout-button';

import { mount } from '../../enzyme'

import { cleanup } from '../../test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { cache, isLoggedInVar } from '../../cache';

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders logout button', async () => {
    await mount(
        <MockedProvider
            cache={cache}>
          <LogoutButton />
        </MockedProvider>);
  });

  it('complete logout', async () => {
    isLoggedInVar(true);
    localStorage.setItem('token', 'testTokenValue');
    localStorage.setItem('userId', 'abc123');
    var wrapper = await mount(
        <MockedProvider
            cache={cache}>
          <LogoutButton />
        </MockedProvider>);

    var button = wrapper.find('button').simulate('click');

    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
