import React from 'react';
import { shallow, mount, render } from '../../enzyme';

import { cleanup } from '../../test-utils';
import Footer from '../footer';

describe('Footer', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  describe('renders without error', () => {
    const wrapper = shallow(<Footer/>);
    it('should have element with cart id', () => {
      expect(wrapper.find('#cart')).not.toBeNull();
    });
    it('should have element with profile id', () => {
      expect(wrapper.find('#profile')).not.toBeNull();
    });
  });
});
