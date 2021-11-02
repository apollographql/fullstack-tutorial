import React from 'react';

import { renderApollo, cleanup } from '../../test-utils';
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';
import { shallow, configure, mount, render  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = shallow(<ActionButton />);
    expect(wrapper.find({ "data-testid": "action-button" })).toBeTruthy();
    //---replaced code for reference---
    //const { getByTestId } = renderApollo(<ActionButton />);
    //---end reference---
  });

  it('shows correct label', () => {   
    let wrapper = shallow(<ActionButton />);
    expect(wrapper.render().text().includes('Add to Cart')).toBe(true);
    //---replaced code for reference---
    //getByText(/add to cart/i);
    //---end reference---

    // rerender with different props to same container
    cartItemsVar(['1']);
    wrapper = shallow(<ActionButton id="1" />);
    expect(wrapper.render().text().includes('Remove from Cart')).toBe(true);
    //---replaced code for reference---
    //renderApollo(<ActionButton id="1" />, { container });
    //getByText(/remove from cart/i);\
    //---end reference---

    // rerender with different props to same container
    cartItemsVar([]);
    const { getByText, container } = renderApollo(<ActionButton />);
    renderApollo(<ActionButton isBooked={true} />, { container });
    getByText(/cancel this trip/i);
  });
});
