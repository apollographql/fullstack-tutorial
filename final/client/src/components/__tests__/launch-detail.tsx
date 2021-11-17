import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import { cleanup } from '../../test-utils';
import LaunchDetail from '../launch-detail';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const shallowObj = shallow(<LaunchDetail
        id={'1'}
        site={'earth'}
        rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
      />,);
    const fullObj = shallow(<LaunchDetail
        id={'2'}
        site={'mars'}
        rocket={{ name: 'Team GeckOS', type: 'small', __typename: 'Rocket', id: '2' }}
      />,);

    expect(shallowObj.find('h3').text()).toBe("that one (big)");
    expect(shallowObj.find('h5').text()).toBe("earth");

    expect(fullObj.find('h3').text()).toEqual("Team GeckOS (small)");
    expect(fullObj.find('h5').text()).toEqual("mars");
  });
});
