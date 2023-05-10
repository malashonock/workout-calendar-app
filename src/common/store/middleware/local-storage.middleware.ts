// https://stackoverflow.com/a/68421466
import { Middleware } from '@reduxjs/toolkit';
import { authSlice } from '../slices';
import { AuthState } from 'features/auth/types';
import { saveToLocalStorage } from 'common/utils';

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (action.type?.startsWith(`${authSlice.name}/`)) {
      const { loggedUser, token } = store.getState()[
        authSlice.name
      ] as AuthState;
      saveToLocalStorage('loggedUser', loggedUser);
      saveToLocalStorage('token', token);
    }

    return result;
  };
