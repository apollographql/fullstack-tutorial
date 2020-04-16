import React from 'react';

import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement,
} from '../../test-utils';
import Login, {LOGIN_USER} from '../login';
import { cache, isLoggedInVar } from '../../cache';

describe('Login Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders login page', async () => {
    renderApollo(<Login />);
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

    const {getByText, getByTestId} = await renderApollo(<Login />, {
      mocks,
      cache,
    });

    fireEvent.change(getByTestId('login-input'), {
      target: {value: 'a@a.a'},
    });

    fireEvent.click(getByText(/log in/i));

    // login is done if loader is gone
    await waitForElement(() => getByText(/log in/i));

    expect(isLoggedInVar()).toBeTruthy();
  });
});
