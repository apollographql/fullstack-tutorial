import React from 'react';

import { render, cleanup } from '../../test-utils';
import { shallow } from 'enzyme';
import LaunchDetail from '../launch-detail';

import renderer from 'react-test-renderer';

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = shallow(
      <LaunchDetail
        id={'1'}
        site={'earth'}
        rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
      />,
    );
    //console.log( wrapper.debug());
  });

  it('launch detail matches the snapshot', () => {
    const tree = renderer.create(
      <LaunchDetail
        id={'1'}
        site={'earth'}
        rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
      />,  
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
