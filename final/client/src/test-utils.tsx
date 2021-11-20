import React from 'react';
import { render } from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

type RenderApolloOptions = {
  mocks?: MockedResponse[],
  addTypename?: any,
  defaultOptions?: any,
  cache?: any,
  resolvers?: any,
  [st: string]: any;
}

// This allows us to be compatible with the mock parameters/data
// that we pass in for some unit tests.
const shallowEnzymeRender = (
  node: any,
  { mocks, addTypename, defaultOptions, cache, resolvers, ...options }: RenderApolloOptions = {},
) => {
  return shallow(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
    >
      {node}
    </MockedProvider>,
    options,
  );
};

// Like shallow, but it renders the children too (no need to use dive)
const fullEnzymeRender = (
  node: any,
  { mocks, addTypename, defaultOptions, cache, resolvers, ...options }: RenderApolloOptions = {},
) => {
  return mount(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
    >
      {node}
    </MockedProvider>,
    options,
  );
};

const sleep = m => new Promise(r => setTimeout(r, m))

const renderApollo = (
  node: any,
  { mocks, addTypename, defaultOptions, cache, resolvers, ...options }: RenderApolloOptions = {},
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
    >
      {node}
    </MockedProvider>,
    options,
  );
};

export * from '@testing-library/react';
export { renderApollo, shallowEnzymeRender, fullEnzymeRender, sleep };
