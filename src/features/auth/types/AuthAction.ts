import { AuthState } from './AuthState';

export type AuthAction = LoginAction | LogoutAction;

export interface LoginAction {
  type: ActionType.Login;
  payload: Required<AuthState>;
}

export interface LogoutAction {
  type: ActionType.Logout;
}

export enum ActionType {
  Login = 'login',
  Logout = 'logout',
}
