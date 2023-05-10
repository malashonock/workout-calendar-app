import { apiBaseUrl } from '.';

export enum MutationMethod {
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const handleResponse = async <TResBody>(
  response: Response,
): Promise<TResBody> => {
  if (response.status >= 300) {
    throw new Error(
      `Server responded with status ${response.status}: ${response.statusText}`,
    );
  }

  let parsedResponse: unknown;

  if (response.headers.get('Content-Type')?.includes('application/json')) {
    parsedResponse = await response.json();
  } else {
    parsedResponse = await response.text();
  }

  return parsedResponse as TResBody;
};

const runQuery = async <TResBody>(
  relativeUrl: string,
  token?: string,
): Promise<TResBody> => {
  const response = await fetch(`${apiBaseUrl}${relativeUrl}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return await handleResponse(response);
};

const runMutation = async <TReqBody, TResBody>(
  relativeUrl: string,
  method: MutationMethod,
  payload: TReqBody,
  token?: string,
): Promise<TResBody> => {
  const response = await fetch(`${apiBaseUrl}${relativeUrl}`, {
    method,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return await handleResponse(response);
};

export const FetchService = {
  runQuery,
  runMutation,
};
