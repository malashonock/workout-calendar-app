import { RestRequest } from 'msw';

export const isAuthenticated = (res: RestRequest): boolean => {
  return res.headers.get('Authorization') !== null;
};
