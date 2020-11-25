import React from 'react';

import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
} from '../../test-utils';
import Login, {LOGIN_USER} from '../login';
import { cache, isLoggedInVar } from '../../cache';
import { LoginForm } from '../../components';

describe('Login Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders login page', async () => {
    const wrapper = renderApollo(<Login />);

    expect(wrapper.contains(<Login />)).toBe(true)
  });

  it('fires login', async () => {
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

    const wrapper = renderApollo(<Login />, {
      mocks,
      cache,
    });

    wrapper.find('button').simulate('click')
    expect(wrapper.find('Space Explorer')).toBeTruthy()
  });
});
