import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { useAuth } from 'features/auth/hooks';
import { AuthActionType } from 'features/auth/types';
import { AuthService } from 'common/services';

export const Logout: FunctionComponent = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await AuthService.logout();

      dispatch({
        type: AuthActionType.Logout,
      });

      navigate('/');
    })();
  }, [dispatch, navigate]);

  return <CircularProgress />;
};
