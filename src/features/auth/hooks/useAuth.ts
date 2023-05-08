import { useContext } from 'react';

import { AuthContextType } from '../types';
import { AuthContext } from '../components';

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
