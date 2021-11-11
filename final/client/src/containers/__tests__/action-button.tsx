import React from 'react';

import { renderApollo, cleanup } from '../../test-utils';
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';
import {render, shallow} from "../../enzyme";
import Button from "../../components/button";
import {ApolloProvider, useApolloClient} from "@apollo/client";

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<ActionButton/>);
  });

  it('empty cart correct label', () => {
    const wrapper = render(<ActionButton/>);
    const button = wrapper.find('div button');

    expect(wrapper.find('div button').text()).toBe('Add to Cart');
  });

  it('populated cart correct label', () => {

    cartItemsVar(['1']);
    const wrapper = render(<ActionButton id="1"/>);
    const button = wrapper.find('div button');

    expect(button.text()).toBe('Remove from Cart');
  });

  it('booked trip correct label', () => {
    const { getByText, container } = renderApollo(<ActionButton />);

    renderApollo(<ActionButton isBooked={true}/>, { container });
    getByText(/cancel this trip/i);
  });

});
