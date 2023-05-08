import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
} from 'react';

import { UserDto } from 'common/model/dto';
import { getFromLocalStorage, saveToLocalStorage } from 'common/utils';
import {
  AuthActionType,
  AuthAction,
  AuthContextType,
  AuthState,
} from 'features/auth/types';

export const AuthContext = createContext<AuthContextType>({
  dispatch: () => undefined,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.Login:
      return action.payload;
    case AuthActionType.Logout:
    default:
      return {};
  }
};

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [authState, dispatch] = useReducer(authReducer, {
    loggedUser: getFromLocalStorage<UserDto | undefined>(
      'loggedUser',
      undefined,
    ),
    token: getFromLocalStorage<string | undefined>('token', undefined),
  });

  useEffect(() => {
    saveToLocalStorage('loggedUser', authState.loggedUser);
  }, [authState.loggedUser]);

  useEffect(() => {
    saveToLocalStorage('token', authState.token);
  }, [authState.token]);

  return (
    <AuthContext.Provider
      value={{
        loggedUser: authState.loggedUser,
        token: authState.token,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
