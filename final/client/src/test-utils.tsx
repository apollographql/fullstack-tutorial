import React from 'react';
import { render } from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter as Router } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypename?: any;
  defaultOptions?: any;
  cache?: any;
  resolvers?: any;
  [st: string]: any;
  history?: any;
};

const renderApollo = (node: any, { mocks, addTypename, defaultOptions, cache, resolvers, history, ...options }: RenderApolloOptions = {}) => {
  return render(
    <Router initialEntries={history}>
      <MockedProvider mocks={mocks} addTypename={addTypename} defaultOptions={defaultOptions} cache={cache} resolvers={resolvers}>
        {node}
      </MockedProvider>
    </Router>,
    options,
  );
};

export * from '@testing-library/react';
export { renderApollo };
