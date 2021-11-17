import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import { cleanup } from '../../test-utils';
import Header from '../header';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Header', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const shallowObj = shallow(<Header />);
    const fullDomObj = mount(<Header />);
    
    expect(shallowObj.find('h2').text()).toBe("Space Explorer");
    expect(fullDomObj.find('h2').text()).toBe("Space Explorer");
  });
});
