import React from 'react';

import { render, cleanup } from '../../test-utils';
import LaunchDetail from '../launch-detail';

import renderer from 'react-test-renderer';

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(
      <LaunchDetail
        id={'1'}
        site={'earth'}
        rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
      />,
    );
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <div>Hello</div>  
    ).toJSON();
    console.log(tree);
  });
});
