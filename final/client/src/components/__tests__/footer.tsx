import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import { renderApollo, cleanup } from '../../test-utils';
import Footer from '../footer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Footer', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const shallowObj = shallow(<Footer />);

    //console.log(shallowObj.dive().debug())
    expect(shallowObj.dive().prop('className')).toBe("css-k4z9m2");
    expect(shallowObj.get(0).key).toBe(null);
    expect(shallowObj.get(0).type).not.toBe(null);

  });
});
