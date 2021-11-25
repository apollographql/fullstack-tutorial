import React from 'react';

import { render, cleanup } from '../../test-utils';
import LaunchDetail from '../launch-detail';
import {shallow} from "enzyme";
import Header from "../header";

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = shallow(<LaunchDetail
        id={'1'}
        site={'Space'}
        rocket={{ name: 'Falcon', type: 'Heavy', __typename: 'Rocket', id: '1' }}
    />);
    expect(wrapper.find('h3').text()).toContain('Falcon (Heavy)');
    expect(wrapper.find('h5').text()).toBe('Space');
  });
});
