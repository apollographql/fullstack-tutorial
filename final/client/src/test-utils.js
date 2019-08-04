import React from 'react';
import { render } from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/react-testing';

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

export * from '@testing-library/react';
export { renderApollo };
