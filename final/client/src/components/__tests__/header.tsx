import { shallow, mount, render } from '../../enzyme';
import { MockedProvider } from '@apollo/client/testing';

import { cleanup } from '../../test-utils';
import Header from '../header';

describe('Header', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
       <Header />
      </MockedProvider>,
    );
    it('should have header element', () => {
      expect(wrapper.find('header')).not.toBeNull();
      expect(wrapper.html()).toContain('header');
    });
    it('should have container element', () => {
      expect(wrapper.find('container')).not.toBeNull();
      expect(wrapper.html()).toContain('container');
    });
    it('should have image element', () => {
      expect(wrapper.find('#image')).not.toBeNull();
      expect(wrapper.html()).toContain('image');
    });
    
  });
});
