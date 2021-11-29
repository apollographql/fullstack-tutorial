import React from 'react';
import { shallow, mount, render } from '../../enzyme';
import { MockedProvider } from '@apollo/client/testing';

import { cleanup } from '../../test-utils';
import Footer from '../footer';

describe('Footer', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  describe('renders without error', () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
       <Footer />
      </MockedProvider>,
    );
    it('should have footer element', () => {
      expect(wrapper.find('footer')).not.toBeNull();
      expect(wrapper.html()).toContain('Cart');
    });
    it('should have cart link', () => {
      expect(wrapper.find('#cart')).not.toBeNull();
      expect(wrapper.html()).toContain('Cart');
    });
    it('should have profile link', () => {
      expect(wrapper.find('#profile')).not.toBeNull();
      expect(wrapper.html()).toContain('profile');
    });
    it('should have logout button', () => {
      expect(wrapper.find('#logout-button')).not.toBeNull();
      expect(wrapper.html()).toContain('Logout');
    });
    it('should have home link', () => {
      expect(wrapper.html()).toContain('Home');
    });
  });
});
