import { FunctionComponent } from 'react';
import { UserForm } from '..';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Paper } from '@mui/material';

import { LoginFields } from 'common/model/form-fields';
import { AuthService, UserService } from 'common/services';
import { logIn } from 'common/store';

import styles from './LoginPage.module.scss';

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Paper className={styles.wrapper}>
      <UserForm<LoginFields>
        title="Log in"
        initialValues={{
          email: '',
          password: '',
        }}
        submit={{
          text: 'Log In',
          callback: async (credentials: LoginFields) => {
            const { userId, token } = await AuthService.login(
              credentials.email,
              credentials.password,
            );

            const loggedUser = await UserService.getUser(userId, token);

            dispatch(
              logIn({
                loggedUser,
                token,
              }),
            );

            navigate('/');
          },
        }}
        auxLink={{
          text: "Don't have an account? Sign up",
          redirectTo: '/auth/signup',
        }}
      />
    </Paper>
  );
};
