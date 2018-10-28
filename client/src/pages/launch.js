import React from 'react';

import PageContainer from '../components/page-container';
import Launch from '../containers/launch';

// the launchId prop here comes from the router
export default ({ launchId }) => {
  return (
    <PageContainer>
      <Launch launchId={launchId} />
    </PageContainer>
  );
};
