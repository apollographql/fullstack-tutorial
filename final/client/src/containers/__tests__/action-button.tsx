import React from 'react';

import { renderApollo, cleanup } from '../../test-utils';
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';
import {shallow} from "enzyme";

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
    expect(getByText(/remove from cart/i).innerHTML).toContain('Remove from Cart');
    cartItemsVar([]);

    // rerender with different props to same container
    renderApollo(<ActionButton isBooked={true} />, { container });
    expect(getByText(/cancel this trip/i).innerHTML).toContain('Cancel This Trip');
  });
});
