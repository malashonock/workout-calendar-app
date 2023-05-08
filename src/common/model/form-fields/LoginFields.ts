import { UserFields } from '.';

export type LoginFields = Pick<UserFields, 'email' | 'password'>;
