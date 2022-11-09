import React from 'react';

import { renderApollo, cleanup, waitFor } from '../../test-utils';
import Launch, { GET_LAUNCH_DETAILS } from '../launch';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
    type: 'test',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
  site: 'earth',
  isInCart: false,
};

describe('Launch Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launch', async () => {
    const mocks = [
      {
        request: { query: GET_LAUNCH_DETAILS, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const history = ['/launch/1'];

    const { getByText } = await renderApollo(
      <Routes>
        <Route path="launch/:launchId" element={<Launch />} />
      </Routes>,
      {
        mocks,
        history,
        resolvers: {},
      },
    );

    await waitFor(() => getByText(/test mission/i));
  });
});
