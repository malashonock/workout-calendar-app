import { UserFields } from 'common/model/form-fields';
import { UserEntity } from '../entities';
import { getFromLocalStorage, saveToLocalStorage } from 'common/utils';

const addUser = async (userData: UserFields): Promise<UserEntity> => {
  const users = await UserRepository.getAllUsers();

  const id = String(users.length + 1);
  const createdUser: UserEntity = {
    id,
    ...userData,
    token: id,
  };

  users.push(createdUser);
  saveToLocalStorage('users', users);

  return createdUser;
};

const getAllUsers = async (): Promise<UserEntity[]> => {
  return getFromLocalStorage<UserEntity[]>('users', []);
};

const getUserById = async (id: string): Promise<UserEntity | null> => {
  const users = await UserRepository.getAllUsers();
  const user = users.find((user: UserEntity) => user.id === id);
  return user || null;
};

const getUserByCredentials = async (
  email: string,
  password: string,
): Promise<UserEntity | null> => {
  const users = await UserRepository.getAllUsers();
  const user = users.find(
    (user: UserEntity) => user.email === email && user.password === password,
  );
  return user || null;
};

export const UserRepository = {
  addUser,
  getAllUsers,
  getUserById,
  getUserByCredentials,
};
