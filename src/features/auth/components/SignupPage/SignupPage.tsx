import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Paper } from '@mui/material';

import { UserForm } from '..';
import { UserFields } from 'common/model/form-fields';
import { AuthService, UserService } from 'common/services';
import { logIn } from 'common/store';

import styles from './SignupPage.module.scss';

export const SignupPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

            dispatch(
              logIn({
                loggedUser: createdUser,
                token,
              }),
            );

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
