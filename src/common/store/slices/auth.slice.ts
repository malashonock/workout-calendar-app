import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { AuthState } from 'features/auth/types';
import { UserDto } from 'common/model/dto';
import { getFromLocalStorage } from 'common/utils';

const initialState: AuthState = {
  loggedUser: getFromLocalStorage<UserDto | undefined>('loggedUser', undefined),
  token: getFromLocalStorage<string | undefined>('token', undefined),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state: AuthState, action: PayloadAction<AuthState>): void => {
      ({ loggedUser: state.loggedUser, token: state.token } = action.payload);
    },
    logOut: (state: AuthState): void => {
      delete state.loggedUser;
      delete state.token;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectLoggedUser = (state: RootState): UserDto | undefined =>
  state.auth.loggedUser;
export const selectAuthToken = (state: RootState): string | undefined =>
  state.auth.token;

export default authSlice;
