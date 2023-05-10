import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';

import { AuthService } from 'common/services';
import { logOut } from 'common/store';

export const Logout: FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await AuthService.logout();
      dispatch(logOut());
      navigate('/');
    })();
  }, [dispatch, navigate]);

  return <CircularProgress />;
};
