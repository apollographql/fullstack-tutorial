import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import {
  renderApollo,
  cleanup,
  waitForElement,
  shallowEnzymeRender,
  fullEnzymeRender,
  sleep
} from '../../test-utils';
import Profile, { GET_MY_TRIPS } from '../profile';
import Adapter from 'enzyme-adapter-react-16';
import { getParsedCommandLineOfConfigFile, isPrivateIdentifier } from 'typescript';

configure({ adapter: new Adapter() });

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
};

const mockMe = {
  __typename: 'User',
  id: 1,
  email: 'a@a.a',
  trips: [mockLaunch],
};

describe('Profile Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders profile page', async () => {
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMe } },
      },
    ];

    const profileObj = fullEnzymeRender(<Profile />, { mocks });

    expect(profileObj.find('MockedProvider').text()).toBe('logo.svg');
    expect(mockLaunch.mission.name === mockMe.trips[0].mission.name);
  });
});
