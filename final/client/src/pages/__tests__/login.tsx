import React from 'react';

import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
  shallowEnzymeRender,
  fullEnzymeRender,
  sleep
} from '../../test-utils';
import Login, {LOGIN_USER} from '../login';
import { cache, isLoggedInVar } from '../../cache';

describe('Login Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders login page', async () => {
    const loginPage = fullEnzymeRender((<Login />));

    expect(loginPage.find('h1').text()).toBe('Space Explorer');
    expect(loginPage.find('button').text()).toBe('Log in');
  });

  it('fires login mutation and updates cache after done', async () => {
    expect(isLoggedInVar()).toBeFalsy();

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

    const loginObject = fullEnzymeRender(<Login />, {
      mocks,
      cache,
    });

    // Initial data
    expect(loginObject.find('h1').text()).toBe('Space Explorer');
    expect(loginObject.find('button').text()).toBe('Log in');

    loginObject.find('.css-wotvke').simulate('change', { target: { value: 'a@a.a' } });

    loginObject.find('.css-wwcn44').simulate('submit');
    await sleep(0);

    expect(isLoggedInVar()).toBeTruthy();
    //console.log(loginObject.debug());
  });
});
