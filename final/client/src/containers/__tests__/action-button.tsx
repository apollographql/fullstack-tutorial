import React from 'react';

import { renderApollo, cleanup } from '../../test-utils';
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const { getByTestId } = renderApollo(<ActionButton />);
    expect(getByTestId('action-button')).toBeTruthy();
  });

  it('shows correct label', () => {
    const { getByText, container } = renderApollo(<ActionButton />);
    getByText(/add to cart/i);

    // rerender with different props to same container
    cartItemsVar(['1']);
    renderApollo(<ActionButton id="1" />, { container });
    getByText(/remove from cart/i);
    cartItemsVar([]);

    // rerender with different props to same container
    renderApollo(<ActionButton isBooked={true} />, { container });
    getByText(/cancel this trip/i);
  });
});
