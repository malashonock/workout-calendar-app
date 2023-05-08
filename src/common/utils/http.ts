import { RestRequest } from 'msw';

export const extractToken = (req: RestRequest): string => {
  const authorizationHeader = req.headers.get('Authorization');

  if (!authorizationHeader) {
    throw new Error('No Authorization header supplied');
  }

  const [authType, token] = authorizationHeader.split(' ');

  if (authType !== 'Bearer') {
    throw new Error('Unknown authorization type');
  }

  if (!token) {
    throw new Error('Token not provided');
  }

  return token;
};
