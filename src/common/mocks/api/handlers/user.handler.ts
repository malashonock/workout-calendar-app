import { PathParams, RestHandler, rest } from 'msw';

import { UserDto } from 'common/model/dto';
import { isAuthenticated } from '../middleware';
import { UserFields } from 'common/model/form-fields';
import { apiBaseUrl } from 'common/utils';
import { UserRepository } from 'common/mocks/repo';
import { UserEntity } from 'common/mocks/entities';

const createUserHandler: RestHandler = rest.post<
  UserFields,
  PathParams<string>,
  UserDto | string
>(`${apiBaseUrl}/users`, async (req, res, ctx) => {
  try {
    const userData = await req.json<UserFields>();
    const createdUser: UserEntity = await UserRepository.addUser(userData);

    if (!createdUser) {
      return res(ctx.status(500), ctx.text('Failed to create new user'));
    }

    return res(ctx.status(201), ctx.json(createdUser as UserDto));
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

const getUserHandler: RestHandler = rest.get<
  null,
  PathParams<string>,
  UserDto | string
>(`${apiBaseUrl}/users/:userId`, async (req, res, ctx) => {
  try {
    if (!isAuthenticated(req)) {
      return res(ctx.status(401), ctx.text('User is not authenticated'));
    }

    const userId = req.params.userId as string;
    if (!userId) {
      return res(ctx.status(400), ctx.text('User id not specified'));
    }

    const user: UserEntity | null = await UserRepository.getUserById(userId);

    if (!user) {
      return res(ctx.status(404), ctx.text('User not found'));
    }

    return res(ctx.status(200), ctx.json(user as UserDto));
  } catch (error) {
    return res(ctx.status(500), ctx.text('Unknown server error'));
  }
});

export const userHandlers = [createUserHandler, getUserHandler];
