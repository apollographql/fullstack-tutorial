import React from 'react';
import { mount } from '../../enzyme';
import { cleanup } from '../../test-utils';
import LoginForm from '../login-form';

describe('Login Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  describe('renders without error', () => {
    const wrapper = mount(<LoginForm login={() => {}}/>);
    it('should have heading element', () => {
      expect(wrapper.find('h1')).not.toBeNull();
      expect(wrapper.html()).toContain('Space Explorer');
    });
    it('should have email input', () => {
      expect(wrapper.find('input')).not.toBeNull();
      expect(wrapper.html()).toContain('Email');
    });
    it('should have login button', () => {
      expect(wrapper.find('button')).not.toBeNull();
      expect(wrapper.html()).toContain('Log in');
    });
  });
});
