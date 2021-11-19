import React from 'react';
import {configure, shallow} from 'enzyme';
import Footer from '../footer';
import Adapter from "enzyme-adapter-react-16";
import MenuItem from "../menu-item";
import {ReactComponent as HomeIcon} from "../../assets/icons/home.svg";
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';


configure({ adapter: new Adapter() })

describe('Component: Footer', () => {

  // automatically unmount and cleanup DOM after the test is finished.
 // afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists())
    //renderApollo(<Footer />);
  });

  it('has menu item', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.containsAllMatchingElements([<MenuItem to="cart"></MenuItem>,<MenuItem to="/"></MenuItem>,<MenuItem to="profile"></MenuItem>]
    ))
  });

  it('has HomeIcon', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.containsMatchingElement(<HomeIcon />))
  })

  it('has CartIcon', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.containsMatchingElement(<CartIcon />))
  })

  it('has ProfileIcon', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.containsMatchingElement(<ProfileIcon />))
  })
});
