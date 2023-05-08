import { UserFields } from 'common/model/form-fields';
import { UserDto } from 'common/model/dto';
import { FetchService, MutationMethod } from 'common/utils';

const registerUser = async (userData: UserFields): Promise<UserDto> => {
  const createdUser = await FetchService.runMutation<UserFields, UserDto>(
    '/users',
    MutationMethod.POST,
    userData,
  );
  return createdUser;
};

const updateUser = async (
  id: string,
  userData: Partial<UserFields>,
  token: string,
): Promise<UserDto> => {
  const updatedUser = await FetchService.runMutation<
    Partial<UserFields>,
    UserDto
  >(`/users/${id}`, MutationMethod.PATCH, userData, token);
  return updatedUser;
};

const getUser = async (id: string, token: string): Promise<UserDto> => {
  const user = await FetchService.runQuery<UserDto>(`/users/${id}`, token);
  return user;
};

export const UserService = {
  registerUser,
  updateUser,
  getUser,
};
