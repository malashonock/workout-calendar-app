import { FunctionComponent } from 'react';
import { UserForm } from '..';
import { useNavigate } from 'react-router-dom';

import styles from './SignupPage.module.scss';
import { Paper } from '@mui/material';
import { UserFields } from 'common/model/form-fields';
import { AuthService, UserService } from 'common/services';
import { useAuth } from 'features/auth/hooks';
import { AuthActionType } from 'features/auth/types';

export const SignupPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  return (
    <Paper className={styles.wrapper}>
      <UserForm
        title="Sign up"
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        submit={{
          text: 'Sign Up',
          callback: async (newUserData: UserFields) => {
            const createdUser = await UserService.registerUser(newUserData);
            const { token } = await AuthService.login(
              newUserData.email,
              newUserData.password,
            );

            dispatch({
              type: AuthActionType.Login,
              payload: {
                loggedUser: createdUser,
                token,
              },
            });

            navigate('/');
          },
        }}
        auxLink={{
          text: 'Already have an account? Log in',
          redirectTo: '/auth/login',
        }}
      />
    </Paper>
  );
};
