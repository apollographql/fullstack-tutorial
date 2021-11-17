import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import { cleanup } from '../../test-utils';
import PageContainer from '../page-container';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Page Container', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const shallowObj = shallow(<PageContainer />);

    expect(shallowObj.get(0).key).toBe(null);
    expect(shallowObj.get(0).type).not.toBe(null);
  });
});
