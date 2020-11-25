import React from 'react';

import { render, cleanup } from '../../test-utils';
import LoginForm from '../login-form';

import renderer from 'react-test-renderer';
import { shallow , mount } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Login Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<LoginForm login={() => {}}/>);
  });

  it('login form matches the snapshot', () => {
    const tree = renderer.create(
      <LoginForm
      login={() => {}}/>,  
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
