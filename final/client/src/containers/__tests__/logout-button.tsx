import React from 'react';
import LogoutButton from '../logout-button';

import { renderApollo, cleanup, fireEvent } from '../../test-utils';
import { cache, isLoggedInVar } from '../../cache';

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders logout button', async () => {
    renderApollo(<LogoutButton />);
  });

  it('complete logout', async () => {
    isLoggedInVar(true);
    localStorage.setItem('token', 'testTokenValue');
    localStorage.setItem('userId', 'abc123');
    let wrapper = renderApollo(<LogoutButton />, { cache });
    //console.log( wrapper.debug() );
    wrapper.find('button').simulate('click');
    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
