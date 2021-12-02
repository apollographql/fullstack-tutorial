import React from 'react';
import LogoutButton from '../logout-button';

import { mount } from '../../enzyme'

import { cleanup } from '../../test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { cache, isLoggedInVar } from '../../cache';

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('should renders logout button', async () => {
    var wrapper = await mount(
        <MockedProvider
            cache={cache}>
          <LogoutButton />
        </MockedProvider>);

      expect(wrapper.find('LogoutButton')).not.toBeNull();
  });

  it('on click of logout button, the user should be completely logout', async () => {
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
