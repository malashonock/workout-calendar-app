import { FunctionComponent } from 'react';

import { Router, StyleProvider } from '..';
import { AuthProvider } from 'features/auth/components';

export const App: FunctionComponent = () => {
  return (
    <StyleProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </StyleProvider>
  );
};
