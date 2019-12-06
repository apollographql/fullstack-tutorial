import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import LogoutButton from '../logout-button';
import gql from 'graphql-tag';

import { renderApollo, cleanup, fireEvent } from '../../test-utils';

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders logout button', async () => {
    renderApollo(<LogoutButton />);
  });

  it('complete logout', async () => {
    const cache = new InMemoryCache();
    cache.writeData({ data: { isLoggedIn: true } });
    localStorage.setItem('token', 'testTokenValue');
    const { getByTestId } = renderApollo(<LogoutButton />, { cache });

    fireEvent.click(getByTestId('logout-button'));

    // check to make sure the cache's contents have been updated
    const response: any = cache.readQuery({
      query: gql`
        query IsUserLoggedIn {
          isLoggedIn @client
        }
      `
    });
    const { isLoggedIn } = response;

    expect(isLoggedIn).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
