import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import { cleanup } from '../../test-utils';
import Loading from '../loading';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Loading', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const shallowObj = shallow(<Loading />);
    expect(shallowObj.prop('className')).toBe('css-kahotv');
  });
});
