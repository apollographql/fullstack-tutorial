import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import { cleanup } from '../../test-utils';
import MenuItem from '../menu-item';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Menu Item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const shallowObj = shallow(<MenuItem to="/wow" />);
    const fullDOMObj = mount(<MenuItem to="/wow" />);

    expect(shallowObj.prop('className')).toBe('css-1yu82wf');
    expect(shallowObj.prop('to')).toBe('/wow');
  });
});
