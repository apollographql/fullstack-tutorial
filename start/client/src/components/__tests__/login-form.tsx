import React from 'react';

import { render, cleanup } from '../../test-utils';
import LoginForm from '../login-form';

describe('Login Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<LoginForm />);
  });
});
