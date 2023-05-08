import { LoginFields } from 'common/model/form-fields';
import { AuthDto } from 'common/model/dto';
import { FetchService, MutationMethod } from 'common/utils';

const login = async (email: string, password: string): Promise<AuthDto> => {
  const authData = await FetchService.runMutation<LoginFields, AuthDto>(
    '/auth/login',
    MutationMethod.POST,
    { email, password },
  );
  return authData;
};

const logout = async (): Promise<void> => {
  await FetchService.runMutation<{}, void>(
    '/auth/logout',
    MutationMethod.POST,
    {},
  );
};

export const AuthService = {
  login,
  logout,
};
