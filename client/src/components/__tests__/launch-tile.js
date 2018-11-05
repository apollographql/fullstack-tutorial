import React from 'react';

import { render } from '../../test-utils';
import LaunchTile from '../launch-tile';

describe('Launch Tile', () => {
  it('renders without error', () => {
    render(
      <LaunchTile
        launch={{
          id: 1,
          mission: { name: 'the first one' },
          rocket: { name: 'harambe' },
        }}
      />,
    );
  });
});
