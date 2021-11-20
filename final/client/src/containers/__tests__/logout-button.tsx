import React from 'react';
import LogoutButton from '../logout-button';
import { configure, shallow, mount, render } from 'enzyme';

import { renderApollo, cleanup, fireEvent, shallowEnzymeRender, fullEnzymeRender } from '../../test-utils';
import { cache, isLoggedInVar } from '../../cache';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders logout button', async () => {
    const logoutButon = shallowEnzymeRender(<LogoutButton />);

    expect(logoutButon.get(0).key).toBe(null);
    expect(logoutButon.get(0).type).not.toBe(null);
    expect(logoutButon.find('ApolloProvider').text()).toEqual("<ApolloProvider />");
  });

  it('complete logout', async () => {
    isLoggedInVar(true);
    localStorage.setItem('token', 'testTokenValue');
    localStorage.setItem('userId', 'abc123');
    const logout_obj = fullEnzymeRender(<LogoutButton />, { cache });
    logout_obj.simulate('click');
    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
