import React from 'react';

import { renderApollo, cleanup } from '../../test-utils';
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = renderApollo(<ActionButton />);
    expect(wrapper.find('action-button')).toBeTruthy();
  });

  it('shows correct label', () => {
    let wrapper = renderApollo(<ActionButton />);
    expect(wrapper.find('add to cart')).toBeTruthy();

    // rerender with different props to same container
    cartItemsVar(['1']);
    wrapper = renderApollo(<ActionButton id="1" />);
    expect(wrapper.find('remove from cart')).toBeTruthy();
    cartItemsVar([]);

    // rerender with different props to same container
    wrapper = renderApollo(<ActionButton isBooked={true} />);
    expect(wrapper.find('cancel this trip')).toBeTruthy();
  });
});
