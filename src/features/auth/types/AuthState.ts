import { UserDto } from 'common/model/dto';

export interface AuthState {
  loggedUser?: UserDto;
  token?: string;
}
