import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import { cleanup } from '../../test-utils';
import LoginForm from '../login-form';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Login Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    
    // Enzyme has several ways to render:
    // 1. Shallow Rendering
    // 2. Full DOM Rendering
    // 3. Static Rendered Markup
    // ref: https://enzymejs.github.io/enzyme/docs/api/render.html

    const shallowObj      = shallow(<LoginForm />);
    const fullDOMObj      = mount(<LoginForm />);
    const staticMarkupObj = render(<LoginForm />);

    shallowObj.simulate('click');
    fullDOMObj.simulate('click');

    expect(shallowObj.find('[required]').exists()).toBe(true);
    expect(shallowObj.find('[type="email"]').exists()).toBe(true);
    expect(shallowObj.find('[name="email"]').exists()).toBe(true);
    expect(shallowObj.find('[placeholder="Email"]').exists()).toBe(true);
    expect(shallowObj.find('[data-testid="login-input"]').exists()).toBe(true);
    expect(shallowObj.find('[type="submit"]').exists()).toBe(true);
    
    expect(fullDOMObj.find('[required]').exists()).toBe(true);
    expect(fullDOMObj.find('[type="email"]').exists()).toBe(true);
    expect(fullDOMObj.find('[name="email"]').exists()).toBe(true);
    expect(fullDOMObj.find('[placeholder="Email"]').exists()).toBe(true);
    expect(fullDOMObj.find('[data-testid="login-input"]').exists()).toBe(true);
    expect(fullDOMObj.find('[type="submit"]').exists()).toBe(true);

    expect(staticMarkupObj.find('button').text()).toEqual("Log in");
    expect(staticMarkupObj.find('h1').text()).toEqual("Space Explorer");
  });
});
