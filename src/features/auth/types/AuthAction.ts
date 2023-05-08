import { AuthState } from './AuthState';

export type AuthAction = LoginAction | LogoutAction;

export interface LoginAction {
  type: AuthActionType.Login;
  payload: Required<AuthState>;
}

export interface LogoutAction {
  type: AuthActionType.Logout;
}

export enum AuthActionType {
  Login = 'login',
  Logout = 'logout',
}
