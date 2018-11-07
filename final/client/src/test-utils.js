import React from 'react';
import { render } from 'react-testing-library';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import { MockedProvider } from 'react-apollo/test-utils';

const renderApollo = (
  node,
  { mocks, addTypename, defaultOptions, cache, ...options } = {},
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
    >
      {node}
    </MockedProvider>,
    options,
  );
};

export * from 'react-testing-library';
export { renderApollo };
