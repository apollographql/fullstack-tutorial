import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import { renderApollo, cleanup } from '../../test-utils';
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const { getByTestId } = renderApollo(<ActionButton />);
    expect(getByTestId('action-button')).toBeTruthy();

    const shallowObj = shallow(<ActionButton />);
    // console.log("***********");
    // console.log(shallowObj.get(0));
    expect(shallowObj.find('ToggleTripButton').text()).toEqual("<ToggleTripButton />");
    expect(shallowObj.dive().prop('id')).toEqual(undefined);
    expect(shallowObj.get(0).key).toBe(null);
    expect(shallowObj.get(0).type).not.toBe(null);
    expect(shallowObj.find('action-button')).toBeTruthy();
  });

  it('shows correct label', () => {
    var actionButtonObj = shallow(<ActionButton />);
    expect(actionButtonObj.contains('add to cart'));
    expect(actionButtonObj.find('ToggleTripButton').text()).toEqual("<ToggleTripButton />");
    expect(actionButtonObj.dive().prop('id')).toEqual(undefined);
    expect(actionButtonObj.get(0).key).toBe(null);
    expect(actionButtonObj.get(0).type).not.toBe(null);

    // rerender with different props to same container
    cartItemsVar(['1']);
    actionButtonObj = shallow(<ActionButton id="1" />);
    expect(actionButtonObj.contains('remove from cart'))
    expect(actionButtonObj.find('ToggleTripButton').text()).toEqual("<ToggleTripButton />");
    expect(actionButtonObj.find('ToggleTripButton').prop('id')).toBe("1");
    expect(actionButtonObj.get(0).key).toBe(null);
    expect(actionButtonObj.get(0).type).not.toBe(null);;
    cartItemsVar([]);

    // rerender with different props to same container
    actionButtonObj = shallow(<ActionButton isBooked={true} />);
    expect(actionButtonObj.contains('cancel this trip'));
    expect(actionButtonObj.find('CancelTripButton').text()).toEqual("<CancelTripButton />");    expect(actionButtonObj.get(0).key).toBe(null);
    expect(actionButtonObj.get(0).type).not.toBe(null);

  });
});
