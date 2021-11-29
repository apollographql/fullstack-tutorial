import React from 'react';
import { mount } from '../../enzyme';
import { cleanup } from '../../test-utils';
import Loading from '../loading';

describe('Loading', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  describe('renders without error', () => {
    const wrapper = mount(<Loading />);
    it('should have logo element', () => {
      expect(wrapper.find('svg')).not.toBeNull();
      expect(wrapper.html()).toContain('logo.svg');
    });
  });
});
