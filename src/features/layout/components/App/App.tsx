import { FunctionComponent } from 'react';

import { Router, StyleProvider } from '..';

export const App: FunctionComponent = () => {
  return (
    <StyleProvider>
      <Router />
    </StyleProvider>
  );
};
