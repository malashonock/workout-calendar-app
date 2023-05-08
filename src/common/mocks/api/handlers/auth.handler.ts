import { PathParams, RestHandler, rest } from 'msw';

import { AuthDto } from 'common/model/dto';
import { LoginFields } from 'common/model/form-fields';
import { apiBaseUrl } from 'common/utils';
import { UserRepository } from 'common/mocks/repo';
import { UserEntity } from 'common/mocks/entities';

const loginHandler: RestHandler = rest.post<
  LoginFields,
  PathParams<string>,
  AuthDto | string
>(`${apiBaseUrl}/auth/login`, async (req, res, ctx) => {
  try {
    const { email, password } = await req.json<LoginFields>();
    const user: UserEntity | null = await UserRepository.getUserByCredentials(
      email,
      password,
    );

    if (!user) {
      return res(
        ctx.status(404),
        ctx.text('User with such email not found, or password is incorrect'),
      );
    }

    const authData: AuthDto = {
      userId: user.id,
      token: user.token,
    };

    return res(ctx.status(200), ctx.json(authData));
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

const logoutHandler: RestHandler = rest.post<
  null,
  PathParams<string>,
  null | string
>(`${apiBaseUrl}/auth/logout`, async (req, res, ctx) => {
  try {
    await Promise.resolve();

    return res(ctx.status(200), ctx.text('User logged out successfully'));
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

export const authHandlers = [loginHandler, logoutHandler];
