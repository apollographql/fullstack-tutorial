import React from 'react';

import { render, cleanup } from '../../test-utils';
import Loading from '../loading';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()})

describe('Loading', () => {




  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<Loading />);
  });
});
