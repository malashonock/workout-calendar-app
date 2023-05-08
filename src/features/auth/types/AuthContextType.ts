import { AuthAction, AuthState } from '.';

export type AuthContextType = AuthState & {
  dispatch: React.Dispatch<AuthAction>;
};
