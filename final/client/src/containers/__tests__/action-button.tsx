import React from 'react';

import { cleanup } from '../../test-utils';
import ActionButton from '../action-button';
import {cache, cartItemsVar} from '../../cache';
import {mount, render} from "../../enzyme";
import {MockedProvider} from "@apollo/client/testing";

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<ActionButton/>);
  });

  it('empty cart correct label', () => {
    const wrapper = render(<ActionButton/>);
    const button = wrapper.find('div button');

    expect(button.text()).toBe('Add to Cart');
  });

  it('populated cart correct label', () => {

    cartItemsVar(['1']);
    const wrapper = render(<ActionButton id="1"/>);
    const button = wrapper.find('div button');

    expect(button.text()).toBe('Remove from Cart');
  });

  it('booked trip correct label', () => {

    var wrapper = mount(
        <MockedProvider
            cache={cache}>
          <ActionButton isBooked={true} />
        </MockedProvider>);

    let button = wrapper.find('button');

    expect(button.text()).toBe('Cancel This Trip');
  });
});
