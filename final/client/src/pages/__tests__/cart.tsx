import React from 'react';

import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Cart from '../cart';
import { cache, cartItemsVar } from '../../cache';

describe('Cart Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders with message for empty carts', () => {
    const { getByTestId } = renderApollo(<Cart />, { cache });
    return waitForElement(() => getByTestId('empty-message'));
  });

  it('renders cart', () => {
    const { getByTestId } = renderApollo(<Cart />, { cache });
    cartItemsVar(['1']);
    return waitForElement(() => getByTestId('book-button'));
  });
});
