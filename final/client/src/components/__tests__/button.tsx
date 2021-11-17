import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import { cleanup } from '../../test-utils';
import Button from '../button';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const buttonObj1 = shallow(<Button>Shallow Button</Button>);
    const buttonObj2 = mount(<Button>Full Button</Button>);
    //console.log(buttonObj1.debug());
    // console.log(shallowObj.get(0));
    expect(buttonObj1.contains('Shallow Button')).toBe(true);
    expect(buttonObj1.find('button').text()).toEqual("Shallow Button");

    expect(buttonObj2.contains('Full Button')).toBe(true);
    expect(buttonObj2.find('button').text()).toEqual("Full Button");

  });
});
