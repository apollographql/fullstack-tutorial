import React from 'react';
import { render } from 'react-testing-library';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import { MockedProvider } from 'react-apollo/test-utils';

const renderApollo = (node, { mocks, addTypename, ...options } = {}) => {
  return render(
    <MockedProvider mocks={mocks || []} addTypename={addTypename}>
      {node}
    </MockedProvider>,
    options,
  );
};

export * from 'react-testing-library';
export { renderApollo };
