import React from 'react';

import { render } from '../../test-utils';
import LoginForm from '../login-form';

describe('Login Form', () => {
  it('renders without error', () => {
    render(<LoginForm />);
  });
});
